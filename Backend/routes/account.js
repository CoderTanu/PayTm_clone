//Send all requests from /api/v1/account/*  in routes/index.js to the router created in step 1.
const express = require('express');

const router =express.Router();
const Account =require("../Db/db");
const {authMiddleware} =require("../middleware/middleware")
const {default:mongoose} =require('mongoose');




router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res)=>
{
  const session = await mongoose.startSession();
  session.startTransaction();
  const {amount, to} =req.body;
  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(session);
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Insufficient balance"
    });
    
}
 
const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
  

});


module.exports=router
