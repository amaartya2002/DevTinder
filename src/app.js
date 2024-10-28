const express = require("express");

const app = express();

app.use("/listen", (req, res) => {
  res.send("HHH");
});

app.use("/", (req, res) => {
  res.send("John Cena");
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
