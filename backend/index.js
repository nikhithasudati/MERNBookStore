import express from "express";
import { PORT,mongodbURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
const app = express();

app.use(express.json());
app.get("/",(request,response) =>{
    // console.log(request)
    return response.status(200).send("welcome")
    
});

app.post("/books",async(request,response) =>{
    try{
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'send all required fields',
            });
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

app.get("/books", async(request,response) =>{
try{
const books = await Book.find({});
return response.status(200).json({
    count: books.lenght,
    data: books
});
}

catch(error){
console.log(error.message);
response.status(404).send({message:"server error"})
}
});

app.get("/:id",async(request,response) =>{
    try{
        const {id} = request.params;

       const book = await Book.findById(id);
       return response.status(200).json(book);

    }
    catch(error){
        console.log(error.message);
        response.status(404).send("Resource not found");
    }
});

app.put("/:id", async(request,response)=>{

    try{
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'send all required fields',
            });
        }

        const {id} = request.params;

        const result =  await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(400).send({message:"book not found"});
        }
        return response.status(200).send({message:"book updated"});
        
    }
    catch(error){
        console.log(error.message)
    }
});


app.delete("/:id", async(request,response) =>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(400).send({message:"book not found"});
        }
        return response.status(200).send({message:"book deleted"});


    }
    catch(error){
        console.log(error.message);
        return response.status(400).send({message:'Error in deleting book'})

    }
});


mongoose.connect(mongodbURL).then(() =>{
    console.log('connected to MongoDB');
    app.listen(PORT,()=> {
        console.log(`App is running on : ${PORT}`);
        });

})
.catch((error) => {
    console.log(error);
})


