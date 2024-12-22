const express = require("express");

const app = express();

const connectToDB = require("./config/database");

const User = require("./models/user");

const PORT = process.env.PORT || 2700;

app.use(express.json());

app.post("/signup", async (req, res) => {
  //console.log(req.body); // Will convert the json obj into a js obj and put it into the req body

  const user = new User(req.body); // Creating a new instance of the User Model

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
