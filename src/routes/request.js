const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user') 


requestRouter.post('/request/send/:status/:userId',userAuth,async(req,res) => {
  try{

    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;


    const allowedStatus = ['interested','ignored'];

    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message: "This is not a valid status"
      })
    }

    const findIfUserExists = await User.findById({_id : toUserId})

    if(!findIfUserExists){
      return res.status(400).json({
        message : 'There is no such user exists on the app!!'
      })
    }


    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or : [
        {fromUserId , toUserId},
        {fromUserId : toUserId , toUserId : fromUserId}
      ]
    })

    if(existingConnectionRequest){
      return res.status(400).json({
        message : "There is an existing connection request !!"
      })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })
    
    
    const data = await connectionRequest.save()

    res.json({
      message : "Connection request made succesfully!!",
      data
    })

    

  }catch(err){
    res.status(400).send('ERROR: ' + err.message);
  }
})


requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res) => {

 try{

   // Akshay(oneWhoSentARequest) --> Virat(loogedInUser) 

  const {status,requestId} = req.params
  const loggedInUser = req.user

  // Check status first
  const allowedStatus = ['accepted','rejected'];
  if(!allowedStatus.includes(status)){
    return res.status(400).json({
      message : "Invalid STATUS"
    })
  }


  // Check for requestId and if the user is 'interested' and is a loggedInUser
  const userData = await ConnectionRequest.findOne({
    _id : requestId,
    toUserId : loggedInUser._id,
    status : "interested",
  })

  if(!userData){
    return res.status(400).json({
      message : "No such USER exist"
    })
  }

  userData.status = status;

  console.log(userData.status);

  await userData.save();
  

  res.json({
    message : `Connection ${status} succesfully`,
    userData
  })


 }catch(err){
  res.status(400).send('ERROR: ' + err.message)
 }

})


module.exports = requestRouter;