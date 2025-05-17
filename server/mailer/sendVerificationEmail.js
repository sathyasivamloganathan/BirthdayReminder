import crypto from "crypto";
import nodemailer from  "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paperemail2456@gmail.com",
    pass: "qghi bmlw loat fxoi",
  },
});

export const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async(userEmail, verificationToken) => {
    const verificationLink = `http://localhost:7000/api/auth/verify-email?token=${verificationToken}`;
    const mailOptions = {
      from: "paperemail2456@gmail.com",
      to: userEmail,
      subject: "Birthday Remainder - Email Verification",
      html: `<h3>Thanks for registering Birthday Remainder website.</h3><h3>Click the link to verify your email:</h3> <a href="${verificationLink}">Click here to Verify Email</a>`,
    };
   try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending verification email', error);
  }
};