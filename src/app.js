const express = require("express");

const app = express();

const { adminauth, userauth } = require("./middlewares/auth");

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

app.use("/admin", adminauth);

app.get("/user/login", (req, res) => {
  res.send("logging the user");
});

app.get("/user/data", userauth, (req, res) => {
  res.send("get user");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("get data");
});

app.get("/admin/deleteAllData", (req, res) => {
  res.send("delete data");
});

app.use("/", (req, res) => {
  res.send("Hello from the dashboard");
});

app.listen(7777, () => {
  console.log("server is successfully on port 7777");
});
