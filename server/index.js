import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/send-email", (req, res) => {
  const { firstname, lastname, message, email, phone } = req.body;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #007BFF;">Contact Us</h2>
        <p style="font-size: 16px;">You have received a new message from your website contact form.</p>
        <hr style="border: 1px solid #007BFF;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${firstname} ${lastname}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;"> ${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Message:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <hr style="border: 1px solid #007BFF;">
        <p style="font-size: 14px;">This message was sent from your website contact form.</p>
      </div>
  `;

  const mailOptions = {
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: `New message from ${firstname} ${lastname}`,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error while sending email:", error);
      res.status(500).json({ error: error.toString() });
    } else {
      console.log("Email sent successfully:");
      res.status(200).json({ message: "Email sent", info: info.response });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
