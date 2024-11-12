const express = require("express");

const app = express();

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Route 1");

//     next();
//     res.send("From route handler1");
//   },
//   (req, res, next) => {
//     console.log("Route 2");
//     //res.send("From route handler 2");
//   }
// );

app.use(
  "/user",
  (req, res, next) => {
    console.log("Route 1");
    res.send("From route handler1");
    next();
  },
  (req, res, next) => {
    console.log("Route 2");
    res.send("From route handler 2");
    next();
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
