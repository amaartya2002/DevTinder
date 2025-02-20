const express = require("express");
const app = express();
const {validateReqBody} = require('./utils/validate')
const {userAuth} = require('./middlewares/auth')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

const connectToDB = require("./config/database");

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request')
const userRouter = require(('./routes/user'))


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);



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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES_FIELD = [
      "firstName",
      "lastName",
      "password",
      "photoUrl",
      "about",
      "skills",
      "gender",
    ];

    const isAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES_FIELD.includes(k)
    );

    if (!isAllowed) {
      throw new Error("Cannot update this field");
    }

    if (data?.skills.length > 5) {
      throw new Error("Cant add more than 5 skills");
    }

    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
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
