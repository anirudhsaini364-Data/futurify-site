require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let submissionCounts = {}; // Temporary in-memory count (production: use DB)

app.post("/api/sendEmail", async (req, res) => {
  const { name, email, phone, captchaValue } = req.body;

  // Verify CAPTCHA
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaValue}`
    );

    if (!response.data.success) {
      return res.status(400).json({ message: "CAPTCHA verification failed." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error verifying CAPTCHA." });
  }

  // Limit 2 submissions per email
  const emailLower = email.toLowerCase();
  if (!submissionCounts[emailLower]) submissionCounts[emailLower] = 0;
  if (submissionCounts[emailLower] >= 2) {
    return res.status(400).json({ message: "You have already submitted twice." });
  }

  // Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    submissionCounts[emailLower]++;
    res.json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
