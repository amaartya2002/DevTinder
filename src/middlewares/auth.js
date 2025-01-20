const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) => {
 try{
  const {token} = req.cookies;  

  if(!token){
    throw new Error('Invalid token !!')
  }

  const userObjId = await jwt.verify(token,"ENCRYPTIONWITHASECRETKEY$22" );

  const {_id} = userObjId ;

  const user = await User.findById({_id});

  if(!user){
    throw new Error('No such User present!!');
  }

  req.user = user;

  next();
}catch(err){
    res.status(400).send("ERROR" + err.message);
  }
};

module.exports = {
  userAuth,
};
