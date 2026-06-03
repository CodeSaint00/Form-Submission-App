import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./model.js";

const app = express();
app.use(express.json);

mongoose.connect("mongodb://localhost:27017/employee");

app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(27017, () => {
  console.log("server is running");
});
