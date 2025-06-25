import { Router } from "express";
import {
  getProfileDetailsController,
  googleController,
  loginController,
  RegisterUserController,
  updateProfileController,
  veriyEmailController,
} from "../controller/authController.js";
import { checkSchema } from "express-validator";
import { UserValidation } from "../validation/UserValidation.js";
import { authenticateUser } from "../middlewares/middlewares.js";
import { upload } from "../utils/multer.js";

const route = Router();

route.post("/register", checkSchema(UserValidation), RegisterUserController);
route.get("/verify-email", veriyEmailController);
route.post("/login", loginController);
route.get("/get-profile", authenticateUser, getProfileDetailsController);
route.put(
  "/updateProfile",
  authenticateUser,
  upload.single("profileImage"),
  updateProfileController
);
route.post("/google", googleController);
export default route;
