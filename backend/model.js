import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be more than 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be more than 8 characters"],
  },
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

export default EmployeeModel;
