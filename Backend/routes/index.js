// In the index.js file, route all the requests to /api/v1 to a apiRouter defined in backend/routes/index.js
//5. Create a new file backend/routes/index.js that exports a new express router.
const express = require('express');

const userRouter=require("../routes/user");
const accountRouter =require("../routes/account");


//8. Import the userRouter in backend/routes/index.js so all requests to /api/v1/user get routed to the userRouter.
const router =express.Router();
router.use("/user", userRouter)
router.use("/account" , accountRouter);



module.exports=router;