const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Aman028:Aman98765@namastenode.hiakcji.mongodb.net/devTinder"
  );
};

module.exports=connectDB;