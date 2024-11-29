const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://028aman:qwert12345@namastenode.quoqy.mongodb.net/aman"
  );
};

module.exports = { connectDB };


