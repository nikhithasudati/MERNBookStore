
import {Book} from "../models/bookModel.js";
import express from "express";

const router = express.Router();

router.post("/",async(request,response) =>{
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

router.get("/", async(request,response) =>{
try{
const books = await Book.find({});
console.log(books);

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

router.get("/:id",async(request,response) =>{
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

router.put("/:id", async(request,response)=>{

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


router.delete("/:id", async(request,response) =>{
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

export default router;