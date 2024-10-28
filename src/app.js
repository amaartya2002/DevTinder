const express = require("express");

const app = express();

//app.use(express.json());

app.use(
  "/test",
  (req, res, next) => {
    console.log("Route1");
    next();
  },
  (req, res, next) => {
    console.log("Route2");
    next();
    res.send("Route2");
  },
  (req, res, next) => {
    console.log("Route3");
    // next();
    res.send("Route3");
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
