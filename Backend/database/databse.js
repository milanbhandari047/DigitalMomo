const mongoose = require("mongoose")


exports.connectDatabase= async(URL)=>{
    await mongoose.connect(URL)
    console.log("Database connected successfully")
}