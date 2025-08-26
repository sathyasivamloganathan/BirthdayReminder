import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendUpcomingMail = async (
  userEmail,
  userName,
  birthdayPName,
  date
) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: `📅 Heads Up! ${birthdayPName}'s Birthday is Coming Soon`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 30px;">
        <div style="
          max-width: 600px; 
          margin: auto; 
          background: #ffffff; 
          padding: 30px 40px; 
          border-radius: 12px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
        ">
          <img 
            src="${process.env.FRONTEND_URL}/android-chrome-512x512.png" 
            alt="DayMora Logo" 
            style="max-width: 100px; margin-bottom: 20px;"
          />
          <h2 style="color: #2b6cb0; margin-bottom: 20px;">
            🎁 Hello ${userName},
          </h2>
          <p style="font-size: 18px; line-height: 1.6; color: #333; margin-bottom: 20px;">
            Just a friendly reminder that <strong style="color:#d53f8c;">${birthdayPName}</strong>'s birthday is coming up on <strong style="color:#3182ce;">${date}</strong>! 🎈
          </p>
          <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
            You’ve got some time to plan a small surprise, pick a gift, or write a thoughtful message. Let’s make it memorable!
          </p>
          <a href="${process.env.FRONTEND_URL}" style="
            display: inline-block;
            background-color: #3182ce;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-bottom: 25px;
          ">
            View Upcoming Birthdays
          </a>
          <hr style="border:none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="font-size: 14px; color: #718096; text-align: center;">
            💡 Stay ahead with <strong style="color:#2c7a7b;">DayMora</strong> – We’ve got your memory covered.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send Upcoming mail: ", error);
  }
};

export const sendTodayMail = async (
  userEmail,
  userName,
  birthdayPName,
  date
) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: `🎉 It's ${birthdayPName}'s Birthday Today!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="
          max-width: 600px; 
          margin: auto; 
          background: #ffffff; 
          padding: 30px 40px; 
          border-radius: 12px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
        ">
          <img 
            src="${process.env.FRONTEND_URL}/android-chrome-512x512.png" 
            alt="DayMora Logo" 
            style="max-width: 100px; margin-bottom: 20px;"
          />
          <h2 style="color: #2b6cb0; margin-bottom: 20px;">
            🎂 Hello ${userName},
          </h2>
          <p style="font-size: 18px; line-height: 1.6; color: #333; margin-bottom: 20px;">
            Just a quick reminder — today is <strong style="color:#d53f8c;">${birthdayPName}</strong>'s birthday (${date})! 🎈
          </p>
          <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
            Don’t miss the chance to brighten their day. A heartfelt message, a call, or even a small surprise can mean a lot!
          </p>
          <a href="${process.env.FRONTEND_URL}" style="
            display: inline-block;
            background-color: #38a169;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-bottom: 25px;
          ">
            View Birthdays on DayMora
          </a>
          <hr style="border:none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="font-size: 14px; color: #718096; text-align: center;">
            💌 Sent with care by <strong style="color:#2c7a7b;">DayMora</strong> – Never miss a moment.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send mail: ", error);
  }
};
