const express = require("express");

const app = express();

//app.use(express.json());

app.get("/user", (req, res) => {
  const { userId, userPassword } = req.query;
  res.send(`User data sent from ${userId} and his password is ${userPassword}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
