const express = require("express"); //referencing to folder of express in node_modules folder
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

const { validateSignUp } = require("./utils/validation");

const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(cookieParser());

const jwt = require("jsonwebtoken");
const { adminAuth, userAuth } = require("./middlewares/auth");

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.post("/sendconnectionrequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " sent the connnection request");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

//GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //return oldest one only one
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
  // try {
  //   const users = await User.find({ emailId: userEmail });
  //   if (users.length === 0) {
  //     res.status(404).send("user not found");
  //   } else {
  //     res.send(users);
  //   }
  // } catch (err) {
  //   res.status(500).send("something went wrong");
  // }
});

//GET all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

// delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

//update info in dataabase
app.patch("/update/:id", async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "gender",
      "skills",
      "password",
      "firstName",
      "lastName",
      "age",
      "photoUrl",
      "about",
    ];
    const isupdatesallowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isupdatesallowed) {
      throw new Error("updates not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    // console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(500).send("Update failed " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Databse connection established.....");
    app.listen(3000, () => {
      console.log("server successfully listening on port 3000....");
    });
  })
  .catch((err) => {
    console.error("Datbase cannot be connected");
  });
