const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not a valid email");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!!"],
    },
    age: {
      type: Number,
      min: 15,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data not valid!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    about: {
      type: String,
      default: "This is a default section for the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.getJWT = async function(){

  const user = this;

  const token = await jwt.sign({_id : user._id} ,"ENCRYPTIONWITHASECRETKEY$22",{expiresIn : '7d'} );

  return token; 
}


userSchema.methods.validateUserPassword = async function(passwordEnteredByUser){
  const user = this;

  const hashedPasswordStored = user.password

  const isPasswordValid = await bcrypt.compare(passwordEnteredByUser,hashedPasswordStored)

  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
