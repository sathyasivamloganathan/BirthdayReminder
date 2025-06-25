import express from "express";
import authRoute from "./routes/authRoute.js";
import birthdayRoute from "./routes/birthdayRoute.js";
import dotenv from "dotenv";
import { connectDatabase } from "./db/connectDb.js";
import { authenticateUser, checkCronSecret } from "./middlewares/middlewares.js";
import { checkAndSendBirthdayReminders } from "./controller/birthdayController.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));



dotenv.config();
const PORT = process.env.PORT;
connectDatabase(); //Database Connection

app.use("/api/auth", authRoute);
app.use("/api", authenticateUser, birthdayRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

// cron.schedule("0 7 * * *", () => {
//   console.log("Checking Birthdays....");
//   checkAndSendBirthdayReminders();
// });

app.get("/send-remainder", checkCronSecret, checkAndSendBirthdayReminders);

app.listen(PORT, "0.0.0.0", (req, res) => {
  console.log(`Port ${PORT} Connected`);
});
