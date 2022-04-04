const express = require('express');
const app=express()
const mongoose  = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
// connectdb
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))
app.use(express.json())
app.use('/user',require('./routes/user'))//direct call route & route page
app.listen(3000,()=>console.log('server run successfully'))