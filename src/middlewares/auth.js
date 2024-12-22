// Handling auth middleware for all types of functions...(get,post,put)
const adminAuth = (req, res, next) => {
  console.log("Admin auth getting checked!");

  let token = "xyz";
  let isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Admin auth getting checked!");

  let token = "xyzx";
  let isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

module.exports = {
  userAuth,
  adminAuth,
};
