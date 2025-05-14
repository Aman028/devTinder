const express = require("express"); //referencing to folder of express in node_modules folder

const app = express();

//?->it means b is not compulsory
// app.get(/\/ab?c/, (req, res) => {
//   res.send("Matched /abc or /ac");
// });

//+-> it means addition sign means we can add as many character we want
// app.get(/\/a(b)+c/, (req, res) => {
//   res.send("ultrimate routing+");
// });

// app.get(/\/a(bc)+c/, (req, res) => {
//   res.send("ultrimate routing+");
// });

//*-> it means we can put anything in between
// app.get(/\/a.*bc/,(req,res)=>{
//   res.send("ultimate routing*");
// })

// if we will write in this two line // if it is present in route it will work
// app.get(/a/,(req,res)=>{
//   res.send("regex routing");
// })

// req /user /user/xyz  /user/1 you can do dynamic routing using /user/:id
app.get("/user", (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

app.get("/user/:userid", (req, res) => {
  //jo semicolon k baad h wahi likhenge params k baad
  const userId = req.params.userid;
  res.send(`Requested user with id: ${userId}`);
});

app.post("/user", (req, res) => {
  res.send("data succewssfully saved to database");
});

app.delete("/user", (req, res) => {
  res.send("data deleted succesfully");
});

//app.use take all methods-- put, post, get, delete.......

app.use("/hello/2", (req, res) => {
  res.send("hello 2");
});

app.use("/hello", (req, res) => {
  res.send("hello hello");
});

app.use("/test", (req, res) => {
  res.send("hello from test server");
});

//it will send request infintely bcz we are not giving response back
app.use("/aman", (req, res) => {});

app.use(
  "/multiple",
  (req, res) => {
    console.log("HANDling the route user 1");
    res.send("Response 1");
  },
  (req, res) => {
    console.log("HANDLING the rout user 2");
    res.send("Response 2");
  }
);

//does not go to second route it runs infintely
app.use(
  "/multiple2",
  (req, res) => {
    console.log("HANDling the route user 1");
    //res.send("Response 1");
  },
  (req, res) => {
    console.log("HANDLING the rout user 2");
    res.send("Response 2");
  }
);

//use next to go to next route
app.use(
  "/multiple3",
  (req, res,next) => {
    console.log("HANDling the route user 1");
    //res.send("Response 1");
    next();
  },
  (req, res) => {
    console.log("HANDLING the rout user 2");
    res.send("Response 2");
  }
);



//it takes all the request
app.use("/", (req, res) => {
  res.send("hii from dashboard");
});

app.use((req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("server successfully listening on port 3000....");
});
