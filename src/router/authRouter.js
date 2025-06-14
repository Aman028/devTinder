const express = require("express");
const authRouter = express.Router();

const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  //creatung a new instance of user Model
  // console.log(req.body);

  try {
    validateSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashpassword,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // console.log(password);
    const emailidpresentUser = await User.findOne({ emailId: emailId });
    // console.log(emailidpresentUser);
    if (!emailidpresentUser) {
      throw new Error("Invalid credentials");
    }
    const passwordcheck = await bcrypt.compare(
      password,
      emailidpresentUser.password
    );
    // console.log(passwordcheck);
    if (passwordcheck) {
      const token = await jwt.sign(
        { _id: emailidpresentUser._id },
        "AmanDevTinder@123",
        { expiresIn: "1d" }
      );
      // console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successfully!");
});

module.exports = { authRouter };
