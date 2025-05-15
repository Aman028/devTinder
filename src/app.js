const express = require("express"); //referencing to folder of express in node_modules folder
const connectDB = require("./config/database");

const app = express();


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
