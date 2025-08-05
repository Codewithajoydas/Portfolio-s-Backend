import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,
  secure: false,
  auth: {
    user: "ajoyd0572@gmail.com",
    pass: process.env.APPPASS,
  },
});

export let sendmail = async (from, text, name) => {
  try {
    let info = await transporter.sendMail({
      from: `"${name}" <${from}>`,
      to: `ajoyd0572@gmail.com`,
      subject: `New Mail came from ${name}`,
      text: text,
    });
    return info;
  } catch (error) {
    console.error("Something went wrong", error);
  }
};
