const express = require("express");

const app = express();

const connectToDB = require("./config/database");

const User = require("./models/user");

const PORT = process.env.PORT || 2700;

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulakr",
    emailId: "tendulakar@10.com",
    password: "Aillaaaa",
    age: "45",
    gender: "Male",
  }); // Creating a new instance of the User Model

  try {
    await user.save();

    res.send("User added succesfully!!");
  } catch (err) {
    res.status(400).send("Unable to save data", err.message);
  }
});

connectToDB()
  .then(() => {
    console.log("Connected to MongoDB successfully!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to the MongoDB cluster:");
  });
