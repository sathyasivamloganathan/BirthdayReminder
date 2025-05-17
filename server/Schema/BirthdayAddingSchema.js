import mongoose from "mongoose";

const BirthdayAddingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    birthdayDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    relationship: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    notes: {
      type: mongoose.Schema.Types.String,
      default: "", // Optional
    },
    remainderType: {
      type: [String],
      enum: ["Email", "Push Notification", "SMS"],
      default: ["Email"],
      required: true,
    },
    remainderTime: {
      type: [String],
      enum: ["1 Month Before", "1 Week Before", "1 Day Before"],
      default: ["1 Day Before"],
      required: true,
    },
    remainderTimeOfDay: {
      type: String,
      default: "07: 00 AM",
    },
    birthdayRemainderOnTheDay: {
      type: Boolean,
      default: true,
      required: true,
    },
    repeatYearly: {
      type: Boolean,
      default: true,
    },
    customMessage: {
      type: String,
      default: "",
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const BirthdayRemainderSchema = mongoose.model("BirthdayRemainderSchema", BirthdayAddingSchema);