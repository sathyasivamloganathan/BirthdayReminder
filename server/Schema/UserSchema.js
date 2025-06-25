import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    googleId: {
      type: mongoose.Schema.Types.String,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    mobile: {
      type: mongoose.Schema.Types.Number,
      required: function () {
        return !this.googleId;
      },
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    dob: {
      type: mongoose.Schema.Types.String,
      required: function () {
        return !this.googleId;
      },
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: function () {
        return !this.googleId;
      },
      minlength: [8, "Password must be atleast 8 characters"],
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
    timeZone: {
      type: String,
      default: "UTC",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);