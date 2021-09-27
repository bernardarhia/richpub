const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    username:{
        type:String, 
        require:true,
        min:6,
        max:20
    }, 
    email:{
        type:String, 
        require:true,
        max:100,
        min:5
    }, 
      password:{
        type:String, 
        require:true,
        max:1024,
        min:6
    }, 
    role:{
        type:String, 
        require:true,
    }, 
    avatar:{
        type:Buffer
    },
    dateCreated:{
        type:Date, 
        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:null
    }
})

module.exports = mongoose.model("User", UserSchema)