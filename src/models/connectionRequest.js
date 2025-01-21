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
      message : `${VALUE} is not a valid status type !!`
    },
    required : true,
  }

},{
  timestamps : true,
});


const ConnectionRequest = mongoose.Model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;