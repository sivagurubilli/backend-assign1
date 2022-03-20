

const express = require("express")


const router = express.Router()

const authenticate = require("../middleware/authenticate")

const Product  =require("../models/product.models")

router.post("",authenticate,async(req,res)=>{
    req.body.user_id = req.userID;
    
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }catch(err){
        return res.send(err.message)
    }
})

router.get("",async(req,res)=>{
    try{
        const product = await Product.find()
        return res.status(200).end(product)

    }catch(err){
        return  res.status(400).send({message:err.message})
        
    }
})

module.exports = router