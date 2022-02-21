const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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

// Before save function runs password will be hashed
userSchema.pre('save',async function(next){
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt) 
        this.password=hashedPassword;
        next()
    }catch(error){
        next(error)
    }
})

const User=new mongoose.model("User",userSchema);

module.exports=User;
