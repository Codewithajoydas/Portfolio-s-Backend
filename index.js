import express from "express";
import { sendmail } from "./utility/mailSender.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.get("/", (req, res) => {
  res.render("index")
});

app.post("/data", async (req, res) => {
  try {
    const { from, text, name } = req.body;
    const data = await sendmail(from, text, name);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
});
app.listen(process.env.PORT, () => {
  console.warn("Server is started successfully");
});
