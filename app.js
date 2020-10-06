const express = require("express");
const bodyParser = require("body-parser");
const exhbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const { error, info } = require("console");

const app = express();

app.engine("handlebars", exhbs());
app.set("view engine", "handlebars");

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your email",
      pass: "password",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOption = {
    from: '"nodemailer" , <lankaproperties47@gmail.com>',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.render("contact", { msg: "Email has been sent..." });
  });
});

app.listen(3000, () => {
  console.log("server started ...");
});
