import { Router } from "express";
import {
  addBirthdayController,
  checkAndSendBirthdayReminders,
  deleteBirthdayController,
  getAllBirthday,
  getSpecificBirthdayToUpdate,
  getUpcomingBirthdays,
  todayBirthdaysController,
  updateSpecificBirthdayController,
} from "../controller/birthdayController.js";
import { upload } from "../utils/multer.js";
import { checkCornSecret } from "../middlewares/middlewares.js";

const route = Router();

route.post(
  "/addBirthday",
  upload.single("profileImage"),
  addBirthdayController
);

route.get("/getBirthdaysAdded", getAllBirthday);

route.get("/getSpecificBirthdayToUpdate/:id", getSpecificBirthdayToUpdate);

route.put(
  "/updateSpecificBirthday/:id",
  upload.single("profileImage"),
  updateSpecificBirthdayController
);

route.delete("/deleteBirthdayAdded/:id", deleteBirthdayController);

route.get("/getUpcomingBirthdays", getUpcomingBirthdays);

route.get("/todayBirthdays", todayBirthdaysController);

route.get("/test-remainder", checkCornSecret, checkAndSendBirthdayReminders);

export default route;