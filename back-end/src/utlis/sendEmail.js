import nodemailer from "nodemailer";
const sendEmail = async ({ html, subject, to }) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "abdallhga192000@gmail.com",
      pass: process.env.SENDEMAILPASS,
    },
    tls: {
      rejectUnauthorized: false, // Add this line to accept self-signed certificates
    },
  });

  const info = await transporter.sendMail({
    from: `"Waraq" abdallhga192000@gmail.com`, // sender address
    to,
    subject,
    html,
  });
  if (info.accepted) {
    return true;
  }
  return false;
};
export default sendEmail;

//zuyq sasx ligz ykzh
