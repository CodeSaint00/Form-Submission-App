import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobTitle: String,
  location: String,
  salary: Number,
  jobType: String,
  applyLink: String,
});

const JobModel = mongoose.model("job", JobSchema);

export default JobModel;
