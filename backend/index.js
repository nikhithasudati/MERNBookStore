import express from "express";
import { PORT,mongodbURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import booksRoute from './routes/booksRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(request,response) =>{
    // console.log(request)
    return response.status(200).send("welcome")
    
});

app.use('/books', booksRoute);


mongoose.connect(mongodbURL).then(() =>{
    console.log('connected to MongoDB');
    app.listen(PORT,()=> {
        console.log(`App is running on : ${PORT}`);
        });

})
.catch((error) => {
    console.log(error);
})


