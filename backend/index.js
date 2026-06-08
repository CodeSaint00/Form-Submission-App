import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./model.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://localhost:27017/employees");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json("Successfully logged in");
      } else {
        res.status(401).json("Invalid password");
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
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const employee = await EmployeeModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(`${employee.username} account has been created`);
    console.log(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log(`server is running`);
});
