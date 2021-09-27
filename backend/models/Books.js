const mongoose = require("mongoose")


const BookSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    authorName:{
        type:String,
    },
    title:{
        type:String, 
        require:true,
    }, 
    description:{
        type:String, 
        require:true,
    }, 
      image:{
        type:Buffer, 
        require:true
    }, 
    quantity:{
        type:Number, 
        require:true,
    }, 
    price:{
        type:Number,
        require:true
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

module.exports = mongoose.model("Book", BookSchema)