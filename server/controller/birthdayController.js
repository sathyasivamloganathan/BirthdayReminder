import { BirthdayRemainderSchema } from "../Schema/BirthdayAddingSchema.js";
import { getUserId } from "../utils/helper.js";
import { User } from "../Schema/UserSchema.js";
import moment from "moment-timezone";
import { sendMail, sendTodayMail } from "../mailer/notificationEmail.js";

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
      customMessage
    };

    if (req.file) {
      updateFields.profileImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const birthday = new BirthdayRemainderSchema({
      userId,
      ...updateFields
    });

    const birthdayAdded = await birthday.save();
    return res.status(201).json({ message: "Birthday Added", birthdayAdded });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error at Adding Birthday Controller: ", error: error.message || error });
  }
};

export const getAllBirthday = async (req, res) => {
  try {
    const userId = getUserId(req);
    const birthdaysAdded = await BirthdayRemainderSchema.find({ userId });
    return res
      .status(201)
      .json({ message: "Birthdays added by you", birthdaysAdded });
  } catch (error) {
    return res.status(500).json({
      message: "Error at Getting all Birthday Stored by the user: ",
      error,
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
    } = req.body;

    const existing = await BirthdayRemainderSchema.findOne({
      _id: id,
      userId,
    });
    if (!existing) {
      return res.status(404).send("Data not found or unauthorized");
    }

    const updated = await BirthdayRemainderSchema.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).send("Data not found updateBirthdayController");
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
      error,
    });
  }
};

export const getUpcomingBirthdays = async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await User.find({ userId });
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

    filtered.sort((a, b) => {
      const aDate = moment(a.birthdayDate);
      const bDate = moment(b.birthdayDate);
      return moment({ month: aDate.month(), day: aDate.date() }).diff(
        moment({ month: bDate.month(), day: bDate.date() })
      );
    });

    return res.status(201).json({ message: "Upcoming Birthdays", filtered });
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
    const user = await User.find({ userId });
    const timezone = user.timeZone || "Asia/Kolkata";
    const today = moment().tz(timezone).startOf("day");

    const birthdays = await BirthdayRemainderSchema.find({ userId });
    const todayBirthdays = birthdays.filter((b) => {
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

export const checkAndSendBirthdayRemainders = async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const timezone = user.timeZone || "Asia/Kolkata";
      const today = moment().tz(timezone).startOf("day");

      const birthdays = await BirthdayRemainderSchema.find({
        userId: user._id,
      });

      for (const b of birthdays) {
        const bDate = moment(b.birthdayDate);
        let nextBirthday = moment({
          year: today.year(),
          month: bDate.month(),
          date: bDate.date(),
        });

        if (nextBirthday.isBefore(today)) {
          nextBirthday = nextBirthday.add(1, "year");
        }

        const daysLeft = nextBirthday.diff(today, "days");

        if (
          (daysLeft === 30 && b.remainderTime.includes("1 Month Before")) ||
          (daysLeft === 7 && b.remainderTime.includes("1 Week Before")) ||
          (daysLeft === 1 && b.remainderTime.includes("1 Day Before")) ||
          daysLeft === 0
        ) {
          if(b.remainderType.includes("Email")) {
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
              await sendMail(
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
  } catch (error) {
    console.error("Error in checkAndSendBirthdayRemainders:", error);
    throw error; // Rethrow to be caught in route
  }
};