const validator = require('validator');
const User = require('../models/user');



const validateReqBody = (req) => {


  const {firstName,lastName,emailId,password} = req.body;


  if(!firstName || !lastName){
    throw new Error('Enter a valid name')
  }else if( !validator.isEmail(emailId) ){
    throw new Error('Not a valid email address')
  }else if(!validator.isStrongPassword(password)){
    throw new Error('Enter a strong password')
  }

}


const validateEditBody = (req) => {


  const allowedEditableFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "photoUrl",
    "about",
    "skills"
  ]

  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditableFields.includes(field));

  return isEditAllowed;
}

const validateEmailAddressForPasswordChange = (req) => {
  
  const loggedInUser = req.user 

  const letEditPassword = loggedInUser.emailId === req.body.emailId
  
  return letEditPassword;

}


module.exports = {
  validateReqBody,
  validateEditBody,
  validateEmailAddressForPasswordChange
}