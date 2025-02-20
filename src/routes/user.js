const express = require('express')
const userRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')


userRouter.get('/user/requests/received',userAuth,async(req,res) => {

try{

    const loggedInUser = req.user

  const connectionRequest = await ConnectionRequest.find({
    toUserId : loggedInUser._id,
    status: 'interested'
  }).populate('fromUserId' , ['firstName','lastName','age','gender']);


  res.json({
    message : "Data feched successfully!!",
    data : connectionRequest
  })

}catch(err){
  res.status(400).send('ERROR: ' + err.message)
}

})

module.exports = userRouter;