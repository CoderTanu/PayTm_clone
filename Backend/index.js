//6. Import the router in index.js and route all requests from /api/v1 to it

const express= require('express');
const app =express();
const rootRouter =require("./routes/index");

const PORT =3000;


//9. Since our frontend and backend will be hosted on separate routes, add the cors middleware to backend/index.js
const cors =require('cors')
app.use(cors())


//10. Since we have to support the JSON body in post requests, add the express body parser middleware to backend/index.js
//You can use the body-parser npm library, or use express.json 

app.use(express.json()); 



app.use("/api/v1" , rootRouter);



//12. Make the express app listen on PORT 3000 of your machine
app.listen(PORT);