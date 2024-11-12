const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("Get all user data");
});

app.get("/admin/getData", (req, res) => {
  res.send("Sent all Data");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("Deleted a user data.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
