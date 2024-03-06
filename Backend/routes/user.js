// 7. Create a new user router 
// Define a new router in backend/routes/user.js and import it in the index router.
// Route all requests  that go to /api/v1/user to the user router.

const express = require('express');
const zod=require("zod");
const router =express.Router();
const {User,Account} =require("../Db/db");
const jwt=require("jsonwebtoken");
const{JWT_SECRET} =require("../config")
const {authMiddleware} =require("../middleware/middleware")

//13. This route needs to get user information, do input validation using zod and store the information in the database provided
// Inputs are correct (validated via zod)
// Database doesn’t already contain another user
//zod validation
const signupBody=zod.object({
     username: zod.string().email(),
     firstName:zod.string(),
     lastName:zod.string(),
     password:zod.string(), 
})

router.post("/signup" , async function(req, res){
    const {success} =signupBody.safeParse(req.body);
    if(!success){
       return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const username= req.body.username;
    const firstName=req.body.firstName;
    const lastName= req.body.lastName;
    const password=req.body.password;

   await User.create({
        username:username,
        firstName:firstName,
        lastName:lastName,
        password:password
    })

    	

    const userId = User._id;

    /// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

        /// -----  ------

    const token=jwt.sign({
        userId 
    },JWT_SECRET)

   
    res.status(200).json({
        message:"User Created Successfully",
        token: token
    })

})

//14. 2. Route to sign in
// Let’s an existing user sign in to get back a token.
 
// Method: POST 
// Route: /api/v1/user/signin
const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("signin", async function(req, res){
    const {success} =signinBody.safeParse(req.body);
    if(!success){
       return res.status(411).json({
            message:  "Email already taken/Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username,
         password:req.body.password
    })


    if (existingUser) {
        const userId = User._id;

        const token=jwt.sign({
            userId 
        },JWT_SECRET)

        res.status(200).json({
            token
        })
        return;
    }

   

    res.status(411).json({
        message: "Error while logging in"
    })



})

//16. Route to update user information

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/user", authMiddleware, async function(req,res){
    const {success}=updateBody.parse(req.body)

    if(!success){
        res.status(411).json({
            message: "Error while updating information"

        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })

})


//17. 2. Route to get users from the backend, filterable via firstName/lastName
// This is needed so users can search for their friends and send them money

router.get("/bulk" , async function(req, res){


    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})









module.exports= router
