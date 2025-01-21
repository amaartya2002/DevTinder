const express = require('express')
const profileRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const {validateEditBody} = require('../utils/validate')
const bcrypt = require('bcrypt')
const {validateEmailAddressForPasswordChange} = require('../utils/validate')

profileRouter.get('/profile/view', userAuth , async(req,res) => {

  try{
     
    user = req.user
    res.send(user);

  }catch(err){
        res.status(400).send('ERROR: '+ err.message);
  }
})


profileRouter.patch('/profile/edit',userAuth , async (req,res) => {

  try{
    //Validate the data fields which the user has entered
  const editAllowed = validateEditBody(req);
  
  if(!editAllowed){
    throw new Error("INVALID EDIT FIELDS")
  }

  const loggedInUser = req.user;

  Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key])

  await loggedInUser.save();

  res.send(`${loggedInUser.firstName} , your profile was updated succesfully!!`)

  }catch(err){
    res.status(400).send('ERROR: ' + err.message)
  }


})

profileRouter.patch('/profile/password',userAuth,async(req,res) => {

  try{

    if(!validateEmailAddressForPasswordChange(req)){
        throw new Error('Different email address or provide email address so to change the password')
    }

    const newPassword = req.body.password;
    const hashedPassword = bcrypt.hash(newPassword,10);

    const loggedInUser = req.user;

    loggedInUser.password = hashedPassword;

    res.send('Password changed succesfully !!');

  }catch(err){
    res.status(400).send('ERROR: ' + err.message)
  }
})


module.exports = profileRouter