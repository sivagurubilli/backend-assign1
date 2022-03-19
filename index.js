
const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const connect =()=>{
    return mongoose.connect("mongodb+srv://gurubilli:gurubilli@cluster0.dlpod.mongodb.net/relations?retryWrites=true&w=majority")
}

const userSchema = new mongoose.Schema({
    firstName :{type:String,requred:true},
    lastName :{type:String,requred:true},
},
{
timestamps:true,
versionKey:false
})
const User = mongoose.model("user",userSchema)

const bookSchema = new mongoose.Schema({
    Name:{type:String,requred:true},
    body:{type:String,requred:true},
    sectionId : {type:mongoose.Schema.Types.ObjectId,ref:"section",required:true},
},
{
    timestamps:true,
versionKey:false

})
const Book = mongoose.model("book",bookSchema)

const SectionSchema = new mongoose.Schema({
    ame:{type:String,required:true},
},
{
    timestamps:true,
    versionKey:false
})
const Section = mongoose.model("section",SectionSchema)


const authorSchema = new mongoose.Schema({
    userId :{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    authorName :{type:String,required:true}
},{
    timestamps:true,
versionKey:false
})
const Author = mongoose.model("author",authorSchema)

const bookAuthor = new mongoose.Schema({
    bookId :{type:mongoose.Schema.Types.ObjectId,ref:"book",required:true},
    authorId :{type:mongoose.Schema.Types.ObjectId,ref:"author",required:true}
},
{
timestamps:true,
versionKey:false
})
const BookAuthor = mongoose.model("bookAuthor",bookAuthor)

const booksection = new mongoose.Schema({
    bookId :{type:mongoose.Schema.Types.ObjectId,ref:"section",required:true}
},
{
    timestamps:true,
versionKey:false
})
const Booksecction = mongoose.model("booksection",booksection)

app.get("/section",async(req,res)=>{
    try{
        const section =await Section.find().lean().exec()
        return res.status(200).send(section)

    }catch(err){
    return res.status(500).send(err.message)
    }
})

app.post("/section",async(req,res)=>{
    try{
        const section = await Section.create(req.body)
        return res.status(201).send(err.message)
    }catch(err){
        return res.status(500).sed(err.message)
    }
})
app.get("/user",async(req,res)=>{
    try{
        const user = await user.find().lean().exec()
        return res.status(200).send(user)
    }catch(err){
        return res.status(500).send(err.message)

    }
})

app.post("/user",async(req,res)=>{
    try{
        const user = await User.create(req.body)
        return res.status(201).send(user)

    }catch(err){
        return res.status(500).send(err.message)

    }
})
app.delete('/section/:id',async(req,res)=>{
    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(200).send(section)

    }catch(err){
        return res.status(500).send(err.message)

    }
})
app.post("/book",async(req,res)=>{
try{
    const book = await Book.removeAllListeners(req.body)
    return res.status(201).send(book)
}catch(err){
    return res.status(500).send(err.message)
}
})

app.post("/bookauthr",async(req,res)=>{
    try{
        const bookauthor = await BookAuthor.create(req.body)
        return res.status(201).send(bookauthor)

    }catch(err){
        return res.status(500).send(err.mesage)

    }
})

app.get("/bookauthor",async(req,res)=>{
    try{
const bookauthor= await BookAuthor.find()
.populate({path:"bookId",select:["Name"]})
.populate({path:"authorId",select:["authorName"]}).lean().exec()
return res.send(bookautor)
    }catch(err){
        return res.send(err.message)  

    }
})

app.get("/booksection",async(req,res)=>{
    try{
        const booksection = await Booksection.find()
        .populate({path:"bookId",select:["Name"]})
 .populate({path:"sectionId",select:[Name]}).lean().ecec()
 return res.status(200).send(booksection)
 
    }catch(err){
        return res.status(500).send(err.message)
    }
})


app.patch("/bookauthor/:id",async(req,res)=>{
    try{
        const bookauthor = await BookAuthor.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.send(bookauthor)

    }catch(err){
        return res.send(err.message)
    }
})



app.listen(5000,async()=>{
    try{
        await connect()
        console.log("5000")
    }catch(err){
        console.log(err)
    }
})