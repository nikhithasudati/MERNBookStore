import express from "express";
import { PORT,mongodbURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get("/",(request,response) =>{
    // console.log(request)
    return response.status(200).send("welcome")
    
})

mongoose.connect(mongodbURL).then(() =>{
    console.log('connected to MongoDB');
    app.listen(PORT,()=> {
        console.log(`App is running on : ${PORT}`);
        });

})
.catch((error) => {
    console.log(error);
})


