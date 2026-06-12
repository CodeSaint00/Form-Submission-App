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
    minlength: [6, "Password must be more than 8 characters"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: Number,
  codeExpiresAt: Number,
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

export default EmployeeModel;
