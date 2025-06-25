import crypto from "crypto";
import nodemailer from  "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  },
});

export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async(userEmail, verificationToken) => {
    const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email?token=${encodeURIComponent(verificationToken)}`;
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: userEmail,
      subject: "Welcome to DayMora – Verify Your Email!",
      text: `Thanks for registering with DayMora! Please verify your email by clicking the link: ${verificationLink}`,
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
            <img src="${
              process.env.FRONTEND_URL
            }/android-chrome-512x512.png" alt="DayMora Logo" style="max-width: 100px; height: auto; margin-bottom: 10px;">
            <h1 style="color: #ffffff; margin: 0;">Welcome to <span style="font-weight: 700;">DayMora</span></h1>
          </div>
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #333333;">Verify Your Email</h2>
            <p style="color: #555555; font-size: 16px;">Thanks for signing up for DayMora! To get started, please verify your email address by clicking the button below.</p>
            <a href="${verificationLink}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">Verify Email</a>
            <p style="margin-top: 20px; font-size: 14px; color: #999999;">If the button doesn't work, copy and paste the link below into your browser:</p>
            <p style="word-break: break-all; font-size: 14px; color: #0070f3;">${verificationLink}</p>
          </div>
          <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888888;">
            &copy; ${new Date().getFullYear()} DayMora. All rights reserved.
          </div>
        </div>
      </div>
      `,
    };
    
   try {
    await transport.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email', error);
    return false;
  }
};