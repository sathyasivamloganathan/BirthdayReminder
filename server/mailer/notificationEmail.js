import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paperemail2456@gmail.com",
    pass: "qghi bmlw loat fxoi",
  },
});

export const sendMail = async (userEmail, userName, birthdayPName, date) => {
  const mailOptions = {
    from: "paperemail2456@gmail.com",
    to: userEmail,
    subject: `Remainder: ${birthdayPName} birthday is coming!!`,
    html: `<div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #ccc;">
      <h2 style="color: #4CAF50;">Hey ${userName},</h2>
      <p style="font-size: 16px;">Just a quick reminder that <strong>${birthdayPName}</strong>'s birthday is on <strong>${date}</strong>.</p>
      <p style="font-size: 16px;">Why not plan something special or send a heartfelt message?</p>
      <hr />
      <p style="font-size: 14px; color: #777;">Set with love from Birthday Reminder App.</p>
    </div>
  </div>`,
  };

  await transport.sendMail(mailOptions);
};

export const sendTodayMail = async (
  userEmail,
  userName,
  birthdayPName,
  date
) => {
  const mailOptions = {
    from: "paperemail2456@gmail.com",
    to: userEmail,
    subject: `Today is ${birthdayPName}'s Birthday!!`,
    html: `<div style="font-family: Arial, sans-serif; background-color: #fffcf5; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fffef5; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #f4e3b2;">
      <h2 style="color: #d2691e;">Hey ${userName}!</h2>
      <p style="font-size: 16px;">It's <strong>${birthdayPName}</strong>'s birthday today (<strong>${date}</strong>)!</p>
      <p style="font-size: 16px;">Don't forget to wish them and maybe surprise them with a gift!</p>
      <hr />
      <p style="font-size: 14px; color: #b8860b;">Brought to you by Birthday Reminder App.</p>
    </div>
  </div>`,
  };

  await transport.sendMail(mailOptions);
};
