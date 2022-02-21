const express=require("express");
const cors= require("cors");
const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cors());

const JWT_SECRET='some super secret ...';

mongoose.connect("mongodb://localhost:27017/userAuthentication",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log("DB is connected")
});

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User=new mongoose.model("User",userSchema);

//Routes
app.post('/login',(req,res)=>{
    console.log(req.body);
    const { email, password} = req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message: "Login Successfull",user:user})
            }else{
                res.send({message: "Wrong Password"})
            }
        }else{
            res.send({message: "User not registered"})
        }
    })
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    User.findOne({email: email},(err,user)=>{
        if(user){
            res.send({message: "User already registered"})
        }else{
            const user=new User({
                name,
                email,   // email: email
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err);
                }else{
                    res.send({message: "Successfully Registered, Please login now"})
                }
            })      
        }
    })
})

app.post('/forgot-password',(req,res,next)=>{
    console.log(req.body);
    const { email} = req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            // User exist and now create aone time link valid for 15 minutes
            if(email===user.email){
                const secret=JWT_SECRET+user.password;
                const payload={
                    email: user.email,
                    id: user.id
                }
                const token=jwt.sign(payload,secret,{expiresIn: '15m'})
                const link=`http://localhost:4500/reset-password/${user.id}/${token}`;
                console.log(link);
                res.send({message: "Password reset link has been sent to ur email...",user:user})
            }else{
                res.send({message: "Invalid email id"})
            }
        }else{
            res.send({message: "User not registered"})
        }
    })      

})

app.get('/reset-password/:id/:token',(req,res,next)=>{ 
    const {id,token}=req.params;
    // Check if this id exist in database
    User.findOne({_id:id},(err,user)=>{
        if(user){
            if(id===user.id){
                // We have a valid id and we have a valid user with this id
                const secret=JWT_SECRET+user.password;
                try{
                    const payload=jwt.verify(token,secret);
                    res.redirect(`http://localhost:3000/reset-password/${id}/${token}`);
                }catch(error){
                    console.log(error.message);
                    res.send(error.message);
                }
            }else{
                res.send({message: "Invalid id..."});
            }
        }else{
            res.send({message: "User not registered"})
        }
    })
})

app.post('/reset-password/:id/:token',(req,res,next)=>{
    const {id,token}=req.params;
    const {ONEpassword,TWOpassword}=req.body;
    // Check if this id exist in database
    User.findOne({_id:id},(err,user)=>{
        if(user){
            if(id===user.id){
                // We have a valid id and we have a valid user with this id
                const secret=JWT_SECRET+user.password;
                try{
                    const payload=jwt.verify(token,secret);
                    // validate password and password2 should match
                    if(ONEpassword === TWOpassword){
                        // we can simply find the user with the payload email and id and finally update the new password
                        // always hash the password before saving
                        user.password=ONEpassword;
                        user.save(err=>{
                            if(err){
                                res.send(err);
                            }else{
                                res.send({message: "Successfully Password Changed"})
                            }
                        })
                        console.log(user);
                    }
                }catch(error){
                    console.log(error.message);
                    res.send(error.message);
                }
            }else{
                res.send({message: "Invalid id..."});
            }
        }else{
            res.send({message: "User not registered"})
        }
    })
})

app.listen(4500,()=> console.log("Server started at 4500"));
