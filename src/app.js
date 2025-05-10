const express = require("express"); //referencing to folder of express in node_modules folder

const app = express();


//it takes all the request
app.use("/",(req,res)=>{
    res.send("hii from dashboard");
});


app.use("/test", (req, res) => {
    res.send("hello from test server");
});

app.use((req, res) => {
  res.send("Hello from the server");
});


app.listen(3000, () => {
  console.log("server successfully listening on port 3000....");
});
