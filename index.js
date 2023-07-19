const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors")
// const mongoose = require('mongoose');

app.use(express.json())
app.use(cors())


// const app = require('./app')

mongoose.connect('mongodb://127.0.0.1:27017/holo-check').then(()=>{
    console.log('database connected')
})

const port = process.env.PORT || 5000;

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, 'User must have a name'],
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true,
        unique:true
    },
    role:{
        type:String,
        required:true,        
    },
    password:{
        type:String,
        required:true
    }
   
   
})

const houseScema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:false

    },
    email:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        // trim:true,
        required:true
    },
    city:{
        type:String,
        // trim:true,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    roomSize:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,        
        // unique:false
    },
    desc:{
        type:String,
        required:true
    }
})

const bookingSchema = mongoose.Schema({
    houseDetail:{
        type:Object
    },renterEmail:{
        type:String
    }
})

const User = mongoose.model('User',userSchema)
const House=mongoose.model('House',houseScema)
const Bookings = mongoose.model('Bookings',bookingSchema)

app.get('/',(req,res)=>{
    res.send('Server is working')
})

userSchema.pre('save',function(doc,next){
    if(this.age==0){
        this.status='new born'
    }    
    next()
})


app.post('/api/v1/user/signup',async(req,res)=>{
    try {
        // const user = new User(req.body)
        const result = await User.create(req.body)

        res.status(200).json({
            status:'success',
            message:'User signup successfully',
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'User not created',
            error:error.message
        })
    }
})

app.post('/api/v1/user/signin/:id',async(req,res)=>{
    try {
        // const userId = req.params.id;
        // const user = User.find({_id:userId})
        // console.log(user)
        // const user = new User(req.body)

        // const result = await user.save()

        // res.status(200).json({
        //     status:'success',
        //     message:'User signup successfully',
        //     data:result
        // })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'User not created',
            error:error.message
        })
    }
})

app.post('/api/v1/houses',async(req,res)=>{
    try {
        const result = await House.create(req.body)

        res.status(200).json({
            status:'success',
            message:'House selected at database',
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'House not inserted',
            error:error.message
        })
    }
})

app.post('/api/v1/bookings',async(req,res)=>{
    try {
        const result = await House.create(req.body)

        res.status(200).json({
            status:'success',
            message:'House selected at database',
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'House not inserted',
            error:error.message
        })
    }
})




app.get('/api/v1/users',async(req,res,next)=>{
    try {
        const users = await User.find({})
        res.status(200).json({
            status:'success',
            users:users
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Bad request',
            error:error.message
        })
    }
})
app.get('/api/v1/users/:id',async(req,res)=>{
    // const user = await User.find({_id:id})
    // console.log("ewe")
    try {
        const id = req.params.id
        const user = await User.find({_id:id})
        res.status(200).json({
            status:'success',
            user
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Bad request',
            error:error.message
        })
    }

})

app.get('/api/v1/houses',async(req,res)=>{
    try{
        const houses = await House.find({})
        res.status(200).json({
            status:'success',
            houses:houses
        })
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:'Bad requests',
            error:error.message
        })
    }
})

app.get('/api/v1/houses/:email',async(req,res)=>{
    try{
        const email = req.params.email
        const house = await House.find({email:email})
        res.send(house)
       
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:'Bad requests',
            error:error.message
        })
    }
})

app.get('/api/v1/house/:id',async(req,res)=>{
    
    try {
        const id = req.params.id
    const house = await House.find({_id:id})
    res.send(house)
        
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Bad requests',
            error:error.message
        })
    }
})

app.patch('/api/v1/houses/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const update = await House.updateOne({_id:id},{$set:req.body})
        res.send(update)
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Cant update',
            error:error.message
        })
    }
})
app.delete('/api/v1/houses/:id',async(req,res)=>{
    const id = req.params.id
    const deleteData = await House.deleteOne({_id:id})
    res.send(deleteData)
})



app.listen(port, ()=>{
    console.log(`App is running at ${port}`)
})