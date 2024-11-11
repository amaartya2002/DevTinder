const express = require("express");

const app = express();

//app.use(express.json());

// This is for params => req like localhost:3000/user/22
// For query => req like localhost:3000/user?userId=22&userPassword=xyz

app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`User data sent from ${userId}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
