const mongoose = require('mongoose')


const connectionRequestSchema = new mongoose.Schema({

  fromUserId : {
    type : mongoose.Types.ObjectId,
    required : true,
  },

  toUserId : {
    type : mongoose.Types.ObjectId,
    required : true,
  },

  status : {
    type : String,
    enum : {
      values : ["interested","ignored","accepted","rejected"],
      message : `{VALUE} is not a valid status type !!`
    },
    required : true,
  }

},{
  timestamps : true,
});


connectionRequestSchema.pre('save',function(next){
    
  const connectionRequest = this

  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error('You cant send a request to yourself')
  }

  next();
})

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;