const express = require("express");

const app = express();
const { connectDB } = require("./config/database");

const { adminauth, userauth } = require("./middlewares/auth");
const { User } = require("./models/user");



// app.use("/hello/2", (req, res) => {
//   res.send("abracadbra");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello hello hello");
// });

// app.use("/test", (req, res) => {
//   res.send("Hello from the server");
// });

// app.get("/ab?c", (req, res) => {
//   res.send("question wala me optional");
// });

// app.get("/ab+c", (req, res) => {
//   res.send("+ wale me kitne bhi b");
// });

// app.get("/abc*", (req, res) => {
//   res.send("* wale me kuch bhi likho * k jagah par");
// });

// app.get(/a/, (req, res) => {
//   res.send("regex wale me bas ye character hona chaiye");
// });

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("req ke query me hota h");
// });

// app.get("/user/:id/:password", (req, res) => {
//   console.log(req.params);
//   res.send("dynamic routing h ye");
// });

// app.get("/user", (req, res) => {
//   res.send({ firstName: "Aman", lastName: "Kumar" });
// });

// app.post("/user", (req, res) => {
//   res.send("data updated successfully");
// });

// app.delete("/user", (req, res) => {
//   res.send("deleted user successfully");
// });

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("response 1");

//     next();
//   },
//   [(req, res) => {
//     console.log("response 2");
//     res.send("response 2");
//   }],
//   (req, res) => {
//     console.log("response 3");
//     res.send("response 3");
//   }
// );

// app.use("/", (req, res, next) => {
//   next();
// });

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("jaao");
//     next();
//   },
//   (req, res) => {
//     res.send("amans");
//   }
// );

// app.get("/user/login", (req, res) => {
//   res.send("logging the user");
// });

// app.get("/user/data", userauth, (req, res) => {
//   res.send("get user");
// });

//handle auth middleware for all request--> get,post,patch,delete
// app.use("/admin", adminauth);

// app.get("/admin/getAllData", (req, res) => {
//   //logic of fetching all data
//   res.send("get data");
// });

// app.get("/admin/deleteAllData", (req, res) => {
//   res.send("delete data");
// });

//error handling
// app.use("/", (err,req, res,next) => {
//   if(err)
//   {
//     res.status(500).send("Something went wrong");
//   }
//   res.send("Hello from the dashboard");
// });

// app.use("/", (err,req, res,next) => {
//   res.send("Hello from the dashboard");
// });

// app.listen(7777, () => {
//   console.log("server is successfully on port 7777");
// });
app.use(express.json());
app.post("/signup", async (req, res) => {
  // const user = new User({
  //   firstName: "Aman",
  //   lastName: "Kumar",
  //   email: "aman@123",
  //   password: "aman@123",
  // });
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Eroor having " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    // const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("user not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(400).send("No emails");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/id", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById({ _id: userId });
    if (user.length === 0) {
      res.status(400).send("No emails");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (user.length === 0) {
      res.status(400).send("no user");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/update/:userid", async (req, res) => {
  const userId = req.params?.userid;
  const data = req.body;
  console.log(userId);
  try {
    // const user = await User.findByIdAndUpdate({ _id: userId }, data);
    const allowed_updates = [
      "photourl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowed_updates.includes(k)
    );
    console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new error("updates not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    if (user.length === 0) {
      res.status(400).send("no user");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("server is successfully listening on port");
    });
  })
  .catch((err) => {
    console.log(err);
    console.error("Database cannot be connected");
  });
