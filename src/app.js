const express = require("express");

const app = express();

const connectToDB = require("./config/database");

const User = require("./models/user");

const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET req => to get one User
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({
      emailId: userEmail,
    });
    res.send(user);
  } catch (err) {
    res.send("User Not Found");
  }
});

// POST req => add user to the feed
app.post("/signup", async (req, res) => {
  //console.log(req.body); // Will convert the json obj into a js obj and put it into the req body

  const user = new User(req.body); // Creating a new instance of the User Model

  try {
    await user.save();
    res.send("User added succesfully!!");
  } catch (err) {
    res.status(400).send("Unable to save data" + err.message);
  }
});

// GET req => to get the feed of all the users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send("Unable to get the feed!!" + err.message);
  }
});

// GET req => to get only one user
app.get("/findOneUser", async (req, res) => {
  const userEmailId = req.body.emailId;

  try {
    const user = await User.findOne({
      emailId: userEmailId,
    });

    console.log(user);

    res.send(user);
  } catch (err) {
    res.status(400).send("Can't find the user" + err.message);
  }
});

// DELETE req => to delete a user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete({
      _id: userId,
    });
    console.log(deletedUser);
    res.send("User Deleted!!");
  } catch (err) {
    res.status(400).send("Could not delete user!!" + err.message);
  }
});

// PATCH req => update user data using _id or any other instance
app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate(
      {
        emailId: emailId,
      },
      data,
      { returnDocument: "after", runValidators: true }
    );

    console.log(user);

    res.send("User updated succesfully!!");
  } catch (err) {
    res.status(400).send("Unaable to update the user!!" + err.message);
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
