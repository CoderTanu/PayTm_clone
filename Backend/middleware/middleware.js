// //15.
// Create a middleware.js file that  exports an authMiddleware function
// Checks the headers for an Authorization header (Bearer <token>)
// Verifies that the token is valid
//  Puts the userId in the request object if the token checks out.
// If not, return a 403 status back to the user

const {JWT_SECERET}=require("../config")
const jwt=require("jsonwebtoken")


const authMiddleware= (req, res, next)=>{
    const authHeader=req.headers.Authorization;


    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token= authorization.split('')[1];

    try{
        const decode = jwt.verify(token, JWT_SECERET);
        req.userId=decode.userId;
        next();
    }catch (err) {
        return res.status(403).json({});
    }
}


module.exports= {
    authMiddleware
}