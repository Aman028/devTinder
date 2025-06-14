const express = require("express"); //referencing to folder of express in node_modules folder
const connectDB = require("./config/database");

const app = express();
const {authRouter}=require("./router/authRouter");
const {profileRouter}=require("./router/profileRouter");
const {requestRouter}=require("./router/requestRouter");



const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

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


// app.patch("/update/:id", async (req, res) => {
//   const userId = req.params?.id;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = [
//       "gender",
//       "skills",
//       "password",
//       "firstName",
//       "lastName",
//       "age",
//       "photoUrl",
//       "about",
//     ];
//     const isupdatesallowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isupdatesallowed) {
//       throw new Error("updates not allowed");
//     }
//************************IMPORTANT*******************************************************88
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "before",
//       runValidators: true,
//     });
//     // console.log(user);
//     res.send("user updated successfully");
//   } catch (err) {
//     res.status(500).send("Update failed " + err.message);
//   }
// });
