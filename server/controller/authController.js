import { validationResult } from "express-validator";
import { User } from "../Schema/UserSchema.js";
import { comparePassword, getUserId, hashPassword } from "../utils/helper.js";
import { generateVerificationToken, sendVerificationEmail } from "../mailer/sendVerificationEmail.js";
import jwt from "jsonwebtoken"
import { upload } from "../utils/multer.js";
// import multer from "multer";

export const RegisterUserController = async (req, res) => {
  try {
    const { name, dob, mobile, email, password } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: result.array() });
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (!name || !email || !dob || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const hashedPassword = hashPassword(password);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = Date.now() + 3600000; // 1 hour expiry

    const newUser = new User({
      name,
      dob,
      mobile,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry,
    });

    try {
      const saveUser = await newUser.save();
      await sendVerificationEmail(email, verificationToken);
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error saving user to database" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const veriyEmailController = async(req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });
        if(!user) {
            return res.status(400).send("Invalid token or user not found");
        }

        if (user.verificationTokenExpiry < Date.now()) {
          return res.status(400).send("Verification token has expired.");
        }

        user.verified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;

        await user.save();
        return res
          .status(200)
          .send("Email successfully verified. You can now log in.");

    } catch (error) {
        return res.status(500).send("Error at verify email: ", error);
    }
}

export const loginController = async(req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).send("Empty fields");
    }
    const findUser = await User.findOne({email})

    if(!findUser) {
      return res.status(400).json({message: "User not found"});
    }

    if(!findUser.verified) {
      return res.status(400).json({message: "Email is not verified"});
    }

    const isPasswordValid = await comparePassword(password, findUser.password);

    if(!isPasswordValid) {
      return res.status(400).json({message: "Password is not correct"});
    }

    const jwt_token = jwt.sign({userId: findUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return res.status(201).json({message: "Login Successful", jwt_token, user: {
      id: findUser._id,
      name: findUser.name
    }})
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error at Login", error: error.message });

  }
}

export const getProfileDetailsController = async (req, res) => {
  try {
    const userId = getUserId(req);
    const findUser = await User.findById(userId);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = findUser.toObject();

    if (user.profileImage?.data) {
      user.profileImage = `data:${
        user.profileImage.contentType
      };base64,${user.profileImage.data.toString("base64")}`;
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error at getting profile details controller",
      error: error.message,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, dob, timeZone, mobile, password } = req.body;

    const userId = getUserId(req);

    const updateFields = { name, dob, timeZone, mobile };

    if (password && password.trim() !== "") {
      const hashedPassword = hashPassword(password); // no await if sync
      updateFields.password = hashedPassword; // not 'hashedPassword'
    }

    if (req.file) {
      updateFields.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found updateProfileController" });
    }

    return res.status(200).json({ message: "Profile Updated", updatedUser });
  } catch (error) {
    console.error("Update error:", error); // Log to console for debugging
    return res
      .status(500)
      .json({ message: "Error at Update profile controller", error });
  }
};