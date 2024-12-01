const { User } = require("../models/user");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const express = require("express");

const app = express();

// const adminauth = (req, res, next) => {
//   const token = "abc";
//   const isauthorized = token === "abc";
//   if (!isauthorized) {
//     res.status(401).send("unauthorized request");
//   } else {
//     next();
//   }
// };

// const userauth = (req, res, next) => {
//   const token = "xyz";
//   const isauthorized = token === "xyz";
//   if (!isauthorized) {
//     res.status(401).send("unauthoized request");
//   } else {
//     next();
//   }
// };
app.use(cookieParser());
app.use(express.json());
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not there!!!");
    }
    const decodedmessage = jwt.verify(token, "Aman@234fkjdkm");
    const _id = decodedmessage._id;
    const user = await User.findOne({ _id: _id });
    if (!user) {
      throw new Error("user is not present");
    }
    req.user=user;
    next();
  } catch (err) {
    res.status(400).send("Error having" + err.message);
  }
};

module.exports = { userAuth };
