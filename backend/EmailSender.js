import { configDotenv } from "dotenv";
import nodeMailer from "nodemailer";
configDotenv();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailSender = async (email, code) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `${code} is your Email Verification code`,
      text: `Your Verification code is ${code}, and it expires in 10mins`,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default emailSender;
