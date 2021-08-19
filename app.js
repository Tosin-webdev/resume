const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

// GET method
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contactform.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tosintest14@gmail.com",
      pass: "testTosin@01",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "oladejit3@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject} `,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
