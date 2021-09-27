const mongoose = require("mongoose")


const CartSchema = mongoose.Schema({
   clientId:{
       type:mongoose.Schema.Types.ObjectId,
       require:true
   },
   cart:{
       type:[Object]
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

module.exports = mongoose.model("Cart", CartSchema)