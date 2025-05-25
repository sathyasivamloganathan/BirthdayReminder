import express from "express"
import authRoute from  "./routes/authRoute.js"
import birthdayRoute from "./routes/birthdayRoute.js"
import dotenv from 'dotenv'
import { connectDatabase } from "./db/connectDb.js";
import { authenticateUser } from "./middlewares/middlewares.js";
import cron from "node-cron";
import { checkAndSendBirthdayRemainders } from "./controller/birthdayController.js"
import cors from "cors";
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.json());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

dotenv.config();
const PORT = process.env.PORT
connectDatabase(); //Database Connection

app.use('/api/auth', authRoute)
app.use('/api', authenticateUser, birthdayRoute)


cron.schedule("0 19 * * *", () => {
    console.log("Checking Birthdays....")
    checkAndSendBirthdayRemainders();
})

app.listen(PORT, '0.0.0.0', (req, res) => {
    console.log(`Port ${PORT} Connected`)
})