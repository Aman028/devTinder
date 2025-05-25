const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("TOken Invalid");
    }
    const decodedmessage = await jwt.verify(token, "AmanDevTinder@123");
    const { _id } = decodedmessage;

    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("Invalid user");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const adminAuth = (req, res, next) => {
  console.log("user auth is getting checked");
  const token = "xyz";
  const isAdminAutorized = token === "xyz";
  if (!isAdminAutorized) {
    res.status(401).send("unauthorized requwest");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
