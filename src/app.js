const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  throw new Error("axcscs");
  res.send("Get all user data");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went off!");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
