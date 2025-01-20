const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')


requestRouter.post('/sendConnection',userAuth,async(req,res) => {
  try{

    res.send('Sending a connection req...');

  }catch(err){
    res.status(400).send('ERROR: ' + err.message);
  }
})


module.exports = requestRouter;