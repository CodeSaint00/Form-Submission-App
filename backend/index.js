import dotenv, { configDotenv } from "dotenv";
dotenv.config();
import express, { response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./model.js";
import bcrypt from "bcrypt";
import emailSender from "./EmailSender.js";
import { OAuth2Client } from "google-auth-library";

const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://localhost:27017/employees");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(401).json({ message: "invalid Email" });
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      if (user.authProvider === "google") {
        res.status(401).json({ message: "sign in with google instead" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const jwtToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "10m" },
          );
          res.cookie("cookieName", jwtToken, {
            httpOnly: true,
            maxAge: 172800000,
          });
          res.status(200).json("Successfully logged in");
        } else {
          res.status(401).json("Invalid password");
        }
      }
    } else {
      res.status(401).json("Not Registered");
    }
  } catch (err) {
    res.status(400).json("something went wrong");
    console.log(err.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(401).json({ message: "invalid Email" });
    const user = await EmployeeModel.findOne({ email: email });
    if (user)
      return res.status(401).json({ message: `${email} already exists` });
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const code = Math.floor(Math.random() * 1000000);

    const employee = await EmployeeModel.create({
      username,
      email,
      password: hashedPassword,
      authProvider: "local",
      verificationCode: code,
      codeExpiresAt: Date.now() + 600000,
    });
    await emailSender(email, code);
    res.status(201).json({ message: `Verification Code sent to ${email}` });
    console.log(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/verify", async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      if (Date.now() < user.codeExpiresAt) {
        if (user.verificationCode === Number(code)) {
          await EmployeeModel.findOneAndUpdate(
            { email: email },
            { isVerified: true },
          );
          res.status(201).json({ message: "Verified Successfully" });
        } else {
          res.status(401).json(`${code} is not desame`);
        }
      } else {
        return res.status(401).json({ message: `${code} expired` });
      }
    } else res.status(401).json({ message: `user does not exist` });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

app.post("/googleLogin", async (req, res) => {
  const { token } = req.body;
  try {
    const client = new OAuth2Client();
    const googleVerify = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = googleVerify.getPayload();
    const user = await EmployeeModel.findOne({ email: payload.email });
    if (!user) {
      const user = await EmployeeModel.create({
        username: payload.name,
        email: payload.email,
        authProvider: "google",
      });
    }
    const jwtToken = jwt.sign(
      { email: payload.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );
    res.cookie("cookieName", jwtToken, {
      httpOnly: true,
      maxAge: 172800000,
    });
    res.status(200).json("Successfully logged in");
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

app.get("/search", async (req, res) => {
  const { search } = req.query;
  try {
    if (!search) {
      const result = await JobModel.find({});
      res.status(200).json(result);
    } else {
      const result = await JobModel.find({
        $or: [
          { jobTitle: new RegExp(search, "i") },
          { location: new RegExp(search, "i") },
        ],
      });
      if (result.length === 0) {
        res.status(404).json({ message: `No results for ${search}` });
      } else {
        res.status(200).json(result);
      }
    }
  } catch (err) {
    res
      .status(401)
      .json({ message: `unable to provide results for ${search}` });
  }
});

app.listen(3000, () => {
  console.log(`server is running`);
});
