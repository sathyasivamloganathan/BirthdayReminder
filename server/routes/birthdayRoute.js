import { Router } from "express";
import {
  addBirthdayController,
  checkAndSendBirthdayRemainders,
  deleteBirthdayController,
  getAllBirthday,
  getSpecificBirthdayToUpdate,
  getUpcomingBirthdays,
  todayBirthdaysController,
  updateSpecificBirthdayController,
} from "../controller/birthdayController.js";
import { upload } from "../utils/multer.js";

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

route.get("/test-remainder", async (req, res) => {
  try {
    await checkAndSendBirthdayRemainders();
    return res.send("Remainder check executed successfully");
  } catch (error) {
    console.error("Caught in route:", error);
    return res.status(500).json({
      message: "Error in sending remainders",
      error: error.message || error,
    });
  }
});

export default route;