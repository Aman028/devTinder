const express = require("express"); //referencing to folder of express in node_modules folder
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creatung a new instance of user Model
  // console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.messsage);
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
app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    // console.log(user);
    res.send("user updated successfully");
  } catch (err) {
    res.status(500).send("Update failed"+err.message);
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
