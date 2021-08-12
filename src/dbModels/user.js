const mongoose = require('mongoose');


const userSchema= new mongoose.Schema({
    email:{
        required:true,
        unique:true,
        type:String,
        trim:true,
        lowercase:true,
        // validate(){
            
        // }
    },
    password:{
        required:true,
        type:String,
        trim:true
    },
    name:{
        required:true,
        type:String,
        trim:true
        },
    isVerified:{
        type:Boolean,
        default:false
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const User=mongoose.model('User',userSchema)
module.exports=User