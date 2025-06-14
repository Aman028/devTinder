const express = require("express");

const profileRouter = express.Router();

const { adminAuth, userAuth } = require("../middlewares/auth");

const { iseditallowed } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!iseditallowed(req)) {
      throw new Error("Invalid edit request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.json({
      message: `${user.firstName}, your profile updated succesfully`,
      data: user,
    });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { existingpassword, newpassword, confirmpassword } = req.body;
    // console.log(existingpassword);
    const user = req.user;
    // console.log(user.password);
    const existingpasswordcheck = await bcrypt.compare(existingpassword, user.password);
    // console.log(existingpasswordcheck);
    if (existingpasswordcheck==false) {
      throw new Error("Invalid existing password");
    }
    if (newpassword != confirmpassword) {
      throw new Error("confirm your password correctly");
    }
    const hashpassword=await bcrypt.hash(newpassword,10);
    user.password = hashpassword;
    await user.save();
    res.send("Your password changed successfully!");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = { profileRouter };
