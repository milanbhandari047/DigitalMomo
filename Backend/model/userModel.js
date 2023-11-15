const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName:{
type:String,
required:[true,"UserName must be provided"]

  },
  userEmail: {
    type: String,
    required: [true, "Email must be provided"],
  },
  userPhoneNumber: {
    type: Number,
    required: [true, "PhoneNumber must be provided"],
  },
  userPassword: {
    type: String,
    required: [true, "Password must be provided"],
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  otp:{
    type:Number
  }
});

const User = mongoose.model("User",userSchema)
module.exports = User
