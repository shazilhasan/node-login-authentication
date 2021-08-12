const mongoose = require('mongoose');
const User=require('../dbModels/user')

const sendVerifyEmail=require('../email/email')

const auth=(req,res,next)=>{
    if(req.session.token==null){
        return res.redirect('/login')
    }
    next()

}

const isLoggedIn=(req,res,next)=>{
    if(req.session.token!=null){
        return res.redirect('/')
    }
    next()
    
}

const isVerified=async (req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(user.isVerified==false){
        const link='http://localhost:3000/verify/'+user._id
        console.log(link)
        sendVerifyEmail(user.email,link)
         return res.send("Account not verified, check your email and verify your account")
    }
    next()
   
}
module.exports={
    auth,
    isLoggedIn,
    isVerified
}