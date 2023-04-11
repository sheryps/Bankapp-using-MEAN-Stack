//1. import mongoose

const mongoose = require('mongoose')

//2. state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true//avoid unwanted warnings
})

//3. Define bank Model

const User = mongoose.model('User',{//model creation
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[],

})
//exporting model
module.exports={
    User
}