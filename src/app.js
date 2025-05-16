const express = require("express"); //referencing to folder of express in node_modules folder
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  //creatung a new instance of user Model
  const user = new User({
    firstName: "Aman",
    lastName: "Kumar",
    emailId: "aman028@gmail.com",
    password: "aman@123",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Eroor saving the user:" + err.messsage);
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
