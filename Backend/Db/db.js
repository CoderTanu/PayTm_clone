//1. Create a new file (db.js) in the root folder
const mongoose =require('mongoose')

//2. Import mongoose and connect to a database of your choice
mongoose.connect('mongodb+srv://Coder_Tanu:root@cluster0.wp0bgm9.mongodb.net/payTMDB')

//3.Create the mongoose schema for the users table 
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        requied:true,
        minLength:6
    },
    firstName:{
       type:String,
       required:true,
       maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    }

});

//18. Update the db.js file to add one new schemas and export the respective models
// Accounts table
// The Accounts table will store the INR balances of a user.
// The schema should look something like this -  

const accountSchema =new mongoose.Schema({
    balance:
    {
        type:Number,
        required:true
    },
    userId:
    {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User"
    }
});


const User=mongoose.model('User',userSchema);
const Account=mongoose.model("Account",accountSchema);

//4. Export the mongoose model from the file (call it User)
module.exports={
    User,
    Account
};