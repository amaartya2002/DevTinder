const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(
    "mongodb+srv://21ucs018:SDCA2sdCKLA1Mvfv@nodejs-learningcluster.cmpmh.mongodb.net/devTinder"
  );
};

module.exports = connectToDB;
