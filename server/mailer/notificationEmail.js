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

export const sendUpcomingMail = async (userEmail, userName, birthdayPName, date) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: userEmail,
    subject: `Reminder: ${birthdayPName}'s birthday is coming!!`,
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px 20px;">
      <div style="
        max-width: 600px; 
        margin: auto; 
        background: #ffffff; 
        padding: 30px 40px; 
        border-radius: 12px; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border: 1px solid #e0e0e0;
        text-align: center;
      ">
        <img src="${process.env.FRONTEND_URL}/android-chrome-512x512.png" alt="DayMora Logo" style="max-width: 120px; margin-bottom: 20px;" />
        <h2 style="color: #2ecc71; margin-bottom: 20px; font-weight: bold;">
          Hey ${userName},
        </h2>
        <p style="font-size: 16px; color: #333; line-height: 1.5; margin-bottom: 15px;">
          Just a quick reminder that <strong>${birthdayPName}</strong>'s birthday is on <strong>${date}</strong>.
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 30px;">
          Why not plan something special or send a heartfelt message?
        </p>
        <hr style="border:none; border-top: 1px solid #eee; margin-bottom: 20px;" />
        <p style="font-size: 14px; color: #999; text-align: center;">
          Sent with ❤️ from <strong>DayMora</strong>.
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
    subject: `Reminder: ${birthdayPName}'s birthday is coming!!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 30px;">
        <div style="
          max-width: 600px; 
          margin: auto; 
          background: #ffffff; 
          padding: 30px 40px; 
          border-radius: 12px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 1px solid #e0e6ed;
          text-align: center;
        ">
          <img 
            src="${process.env.FRONTEND_URL}/android-chrome-512x512.png" 
            alt="DayMora Logo" 
            style="max-width: 120px; margin-bottom: 20px;"
          />
          <h2 style="color: #2c7a7b; margin-bottom: 20px; font-weight: 700;">
            Hey ${userName},
          </h2>
          <p style="font-size: 18px; line-height: 1.6; color: #334e68; margin-bottom: 15px;">
            Just a quick reminder that <strong style="color:#d53f8c;">${birthdayPName}</strong>'s birthday is on <strong style="color:#3182ce;">${date}</strong>.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #4a5568; margin-bottom: 30px;">
            Why not plan something special or send a heartfelt message?
          </p>
          <hr style="border:none; border-top: 1px solid #e2e8f0; margin-bottom: 25px;" />
          <p style="font-size: 14px; color: #718096; text-align: center; letter-spacing: 0.03em;">
            💖 Sent with love from <span style="font-weight: 600; color:#2c7a7b;">DayMora</span>.
          </p>
        </div>
      </div>`,
  };
  
  

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send mail: ", error)
  }
};
