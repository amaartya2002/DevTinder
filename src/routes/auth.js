const express = require('express')
const authRouter = express.Router()
const {validateReqBody} = require("../utils/validate")
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken');



authRouter.post("/signup", async (req, res) => {
  //console.log(req.body); // Will convert the json obj into a js obj and put it into the req body

  //Validate the data
  validateReqBody(req);

  const {firstName , lastName , emailId , password} = req.body
  
  //Encrypt the password
  const hashedPassword = await bcrypt.hash(password,10);
  

  const user = new User(
    {
      firstName,
      lastName,
      emailId,
      password : hashedPassword
    }
  ); // Creating a new instance of the User Model

  try {
    await user.save();
    res.send("User added succesfully!!");
  } catch (err) {
    res.status(400).send(`ERROR : ${err.message}`);
  }
});



authRouter.post('/login',async(req,res) => {

  try{

  const {emailId,password} = req.body;

  const user = await User.findOne({
    emailId : emailId
  })
    
  if(emailId != user.emailId){
    throw new Error('Invalid Credentails')
  }

  const isTruePassword = user.validateUserPassword(password);

  if(isTruePassword){


    // create a JWT token on the id of the user with a secret-key
     const token = await user.getJWT();

    // Wrap the token into a cookie and send it to the User
    res.cookie("token",token);

    res.send('User logged in succesfully');
  }else{
    throw new Error('Invalid Credentails')
  }

  }catch(err){
    res.status(400).send('ERROR: '+err.message);
    
  }


})


module.exports = authRouter