const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
const bcrypt = require('bcrypt');
require('./src/db/mongoose')
const mongoose = require('mongoose');
const User=require('./src/dbModels/user')
const { auth , isLoggedIn , isVerified}=require('./src/middleware/auth');

const app=express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')
app.set('trust proxy', 1) // trust first proxy

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
  name: 'session',
  keys: ['this is a secret key'],
  maxAge:3660000

}))

app.get('/',auth,async (req,res)=>{
    const auth=req.session.token
    const user=await User.findById(auth)
    res.render('index.ejs',{name:user.name})
})

app.get('/login',isLoggedIn,(req,res)=>{
    res.render('login.ejs',{error:null})
})
app.post('/login',isVerified,isLoggedIn,async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    try{
        if(email=="" || password==""){
            return res.render('login.ejs',{error:"please fill out all the fields"})
        }
        const user=await User.findOne({email})
        if(user==null){
            return res.render('login.ejs',{error:"user doesnt exists"})
        }
        const comparePasswords=await bcrypt.compare(password,user.password)
        if(comparePasswords){
            console.log(user._id)
            req.session.token=user._id
            res.redirect('/')
        }
        else{
            return res.render('login.ejs',{error:"password incorrect"})
        }
    }catch(e){
        res.status(500).send('Server Error')
    }

   
})
app.get('/register',isLoggedIn,(req,res)=>{
    res.render('register.ejs',{error:null})
})
var errors
app.post('/register',isLoggedIn, async (req,res)=>{
    const email=req.body.email
    var password=req.body.password
    const name=req.body.name

    if(email=="" || password=="" || name==""){
        return res.render('register.ejs',{error:"please fill out all the fields"})
    }
    try{
    const userExists= await User.findOne({email})
    if(userExists!=null){
        return res.render('register.ejs',{error:'Email exists'})
    }

    password= await bcrypt.hash(password,10)
    
    const user= await new User({email,password,name})
   
        await user.save()
        req.session.token=user._id
        res.redirect('/')
    }catch(e){
        console.log(e)
    }
})


app.get('/logout',(req,res)=>{
    req.session.token=null
    res.redirect('/login')
})

app.get('/verify/:id',async (req,res)=>{
   
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            res.status(404).send('user not found')
        }
        if(user.isVerified==false){
            user.isVerified=true
            await user.save()
            return res.render('verified.ejs',{message:"Email verified successfully please proceed to login"})
        }else{
            return res.render('verified.ejs',{message:"Email already verified please proceed to login"})
        }
      
    }
    catch(e){
        console.log(e)
        res.status(500).send('internal server error')
    }
 

})


app.listen(3000,()=>{ 
    console.log("listening on 3000")
})