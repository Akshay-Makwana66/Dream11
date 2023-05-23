const express = require('express');
const mongoose = require('mongoose');
const  route = require('./routes/route');
const app = express();

app.use(express.json())

mongoose.connect('mongodb+srv://AkshayMakwana:Akshay123@cluster0.zmta9.mongodb.net/dream11-DB?retryWrites=true&w=majority',{
    useNewUrlParser:true
})
.then(()=>{
    console.log('mongoDb is connected')
})
.catch((err)=>{
    console.log(err);
})

app.use('/',route)

app.listen(3000, ()=>{
    console.log('Server starts');
})

