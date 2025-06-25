import { BirthdayRemainderSchema } from "../Schema/BirthdayAddingSchema.js";
import { getUserId } from "../utils/helper.js";
import { User } from "../Schema/UserSchema.js";
import moment from "moment-timezone";
import {
  sendUpcomingMail,
  sendTodayMail,
} from "../mailer/notificationEmail.js";

export const addBirthdayController = async (req, res) => {
  try {
    const userId = getUserId(req);
    const {
      name,
      birthdayDate,
      relationship,
      notes,
      remainderType,
      remainderTime,
      remainderTimeOfDay,
      birthdayRemainderOnTheDay,
      repeatYearly,
      customMessage,
    } = req.body;

    const updateFields = {
      name,
      birthdayDate,
      relationship,
      notes,
      remainderType,
      remainderTime,
      remainderTimeOfDay,
      birthdayRemainderOnTheDay,
      repeatYearly,
      customMessage,
    };

    if (req.file) {
      updateFields.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const birthday = new BirthdayRemainderSchema({
      userId,
      ...updateFields,
    });

    const birthdayAdded = await birthday.save();
    return res.status(201).json({ message: "Birthday Added", birthdayAdded });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Adding Birthday Controller: ",
      error: error.message || error,
    });
  }
};

export const getAllBirthday = async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await User.find({ _id: userId });
    const timezone = user.timeZone || "Asia/Kolkata";
    const today = moment().tz(timezone).startOf("day");
    const birthdaysAdded = await BirthdayRemainderSchema.find({ userId });

    const upcoming = birthdaysAdded.map((b) => {
      const bDate = moment(b.birthdayDate);
      let adjusted = moment({
        year: today.year(),
        month: bDate.month(),
        date: bDate.date(),
      });
      if (adjusted.isBefore(today)) {
        adjusted = adjusted.add(1, "year");
      }
      const daysLeft = adjusted.diff(today, "days");
      return {
        ...b.toObject(),
        remainingDays: daysLeft,
        adjustedDate: adjusted,
      };
    });

    const processedBirthdays = upcoming.map((b) => {
      if (b.profileImage?.data) {
        return {
          ...b,
          profileImage: `data:${
            b.profileImage.contentType
          };base64,${b.profileImage.data.toString("base64")}`,
        };
      }
      return b;
    });

    processedBirthdays.sort((a, b) => {
      const aDate = moment(a.birthdayDate);
      const bDate = moment(b.birthdayDate);
      return moment({ month: aDate.month(), day: aDate.date() }).diff(
        moment({ month: bDate.month(), day: bDate.date() })
      );
    });

    return res
      .status(201)
      .json({ message: "Birthdays added by you", processedBirthdays });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Getting all Birthday Stored by the user: ",
      error: error.message,
    });
  }
};

export const getSpecificBirthdayToUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);
    const birthdaysAdded = await BirthdayRemainderSchema.findOne({
      _id: id,
      userId,
    });
    if (!birthdaysAdded) {
      return res
        .status(404)
        .json({ message: "Birthday Not found to get or unauthorized" });
    }
    return res.status(201).json({ birthdaysAdded });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Getting all Birthday Stored by the user: ",
      error,
    });
  }
};

export const updateSpecificBirthdayController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);
    const {
      name,
      birthdayDate,
      relationship,
      notes,
      remainderType,
      remainderTime,
      remainderTimeOfDay,
      birthdayRemainderOnTheDay,
      repeatYearly,
      customMessage,
      deleteProfileImage,
    } = req.body;

    const updateFields = {
      name,
      birthdayDate,
      relationship,
      notes,
      remainderType,
      remainderTime,
      remainderTimeOfDay,
      birthdayRemainderOnTheDay,
      repeatYearly,
      customMessage,
    };

    if (req.file) {
      updateFields.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    if (deleteProfileImage === "true") {
      updateFields.profileImage = null;
    }

    const existing = await BirthdayRemainderSchema.findOne({
      _id: id,
      userId,
    });

    if (!existing) {
      return res.status(404).send("Data not found or unauthorized");
    }

    const updated = await BirthdayRemainderSchema.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Data not found updateBirthdayController" });
    }
    return res.status(200).json({ message: "Birthday Updated: ", updated });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Updating the Birthday Stored by the user: ",
      error,
    });
  }
};

export const deleteBirthdayController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);
    const deletedData = await BirthdayRemainderSchema.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!deletedData) {
      return res
        .status(404)
        .json({ message: "Birthday Not found to delete or unauthorized" });
    }

    return res
      .status(201)
      .json({ message: "Deleted Successfully", deletedData });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Deleting Birthday Stored by the user: ",
      error: error.message,
    });
  }
};

export const getUpcomingBirthdays = async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await User.find({ _id: userId });
    const timezone = user.timeZone || "Asia/Kolkata";
    const today = moment().tz(timezone).startOf("day");
    const oneMonthLater = moment(today).add(1, "months");

    const birthdays = await BirthdayRemainderSchema.find({ userId });

    const upcoming = birthdays.map((b) => {
      const bDate = moment(b.birthdayDate);
      let adjusted = moment({
        year: today.year(),
        month: bDate.month(),
        date: bDate.date(),
      });
      if (adjusted.isBefore(today)) {
        adjusted = adjusted.add(1, "year");
      }
      const daysLeft = adjusted.diff(today, "days");
      return {
        ...b.toObject(),
        remainingDays: daysLeft,
        adjustedDate: adjusted,
      };
    });

    const filtered = upcoming.filter((b) => {
      const bDate = moment(b.birthdayDate);
      const adjusted = moment({
        year: today.year(),
        month: bDate.month(),
        date: bDate.date(),
      });
      return adjusted.isAfter(today) && adjusted.isBefore(oneMonthLater);
    });

    const processedBirthdays = filtered.map((b) => {
      if (b.profileImage?.data) {
        return {
          ...b,
          profileImage: `data:${
            b.profileImage.contentType
          };base64,${b.profileImage.data.toString("base64")}`,
        };
      }
      return b;
    });

    processedBirthdays.sort((a, b) => {
      const aDate = moment(a.birthdayDate);
      const bDate = moment(b.birthdayDate);
      return moment({ month: aDate.month(), day: aDate.date() }).diff(
        moment({ month: bDate.month(), day: bDate.date() })
      );
    });

    return res
      .status(201)
      .json({ message: "Upcoming Birthdays", processedBirthdays });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Get Upcoming Birthdays Stored by the user: ",
      error,
    });
  }
};

export const todayBirthdaysController = async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await User.findOne({ _id: userId });
    const timezone = user.timeZone || "Asia/Kolkata";
    const today = moment().tz(timezone).startOf("day");

    const birthdays = await BirthdayRemainderSchema.find({ userId });

    const processedBirthdays = birthdays.map((b) => {
      if (b.profileImage?.data) {
        return {
          ...b._doc,
          profileImage: `data:${
            b.profileImage.contentType
          };base64,${b.profileImage.data.toString("base64")}`,
        };
      }
      return b._doc;
    });

    const todayBirthdays = processedBirthdays.filter((b) => {
      const bDate = moment(b.birthdayDate);
      // const bDate = moment({ year: today.year(), month: b.month(), date: b.date() });
      return bDate.month() === today.month() && bDate.date() === today.date();
    });

    return res
      .status(201)
      .json({ message: "Today's Birthday", todayBirthdays });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Get Upcoming Birthdays Stored by the user: ",
      error,
    });
  }
};

export const checkAndSendBirthdayReminders = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const timezone = user.timeZone || "Asia/Kolkata";
      const today = moment().tz(timezone).startOf("day");
      const now = moment().tz(timezone);
      const currHour = now.hour();
      let currMin = now.minute();
      currMin = currHour * 60 + currMin;

      const birthdays = await BirthdayRemainderSchema.find({
        userId: user._id,
      });

      for (const b of birthdays) {
        const bDate = moment(b.birthdayDate).startOf("day");
        let nextBirthday = moment
          .tz(
            { year: today.year(), month: bDate.month(), date: bDate.date() },
            timezone
          )
          .startOf("day");

        if (nextBirthday.isBefore(today)) {
          nextBirthday = nextBirthday.add(1, "year");
        }

        const daysLeft = nextBirthday.diff(today, "days");

        let [reminderHour, reminderMinutes] = b.remainderTimeOfDay
          .split(":")
          .map(Number);

        reminderMinutes = reminderHour * 60 + reminderMinutes;

        const isDaysMatchingSchedule =
          (daysLeft === 30 && b.remainderTime.includes("1 Month Before")) ||
          (daysLeft === 7 && b.remainderTime.includes("1 Week Before")) ||
          (daysLeft === 1 && b.remainderTime.includes("1 Day Before")) ||
          daysLeft === 0;

        const WINDOW_SIZE = 10;
        const isReminderTimeMatching =
          reminderMinutes >= currMin && reminderMinutes < currMin + WINDOW_SIZE;
        if (isDaysMatchingSchedule) {
          if (isReminderTimeMatching) {
            if (b.remainderType.includes("Email")) {
              if (
                bDate.date() === today.date() &&
                bDate.month() === today.month()
              ) {
                await sendTodayMail(
                  user.email,
                  user.name,
                  b.name,
                  bDate.format("MMMM Do")
                );
              } else {
                await sendUpcomingMail(
                  user.email,
                  user.name,
                  b.name,
                  bDate.format("MMMM Do")
                );
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in checkAndSendBirthdayRemainders:", error);
    throw error;
  }
};
