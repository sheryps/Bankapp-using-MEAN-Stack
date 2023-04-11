//server creation

//1. import express
const express = require('express')

//import tokenn

const jwt = require('jsonwebtoken')

const cors = require('cors')
//to acess dataservices
const dataService = require('./services/dataservice')//to acess dataservice here

//2.create an app using express
const app = express()

//cors

app.use(cors({
    origin:'http://localhost:4200',
}))

app.use(express.json())//to return json content to javascript
//3.create a port number

app.listen(3000,()=>{
    console.log('listening on port 3000');
})

//application middleware
const appMiddleware=(req,res,next)=>{
    console.log('application specific middleware');
    next()
}

app.use(appMiddleware)

//router specific middleware

const jwdrouterMiddleware =(req,res,next)=>{
    try{
        console.log('router specific middleware');
        const token = req.headers['x-acess-token'];
        const data = jwt.verify(token,'superkey2023')//
        console.log(data);
        next();
    }
    catch{
        //422 -unprocesseble entity
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'Please login first'
        })
    }

}

//4. resolving http requests

// app.get('/',(req,res)=>{
//     res.send('Get hello http request')
// })

// app.post('/',(req,res)=>{
//     res.send('post http request')
// })

// app.put('/',(req,res)=>{
//     res.send('put http request')
// })

// app.patch('/',(req,res)=>{
//     res.send('patch http request')
// })

// app.delete('/',(req,res)=>{
//     res.send('delete http request')
// })


//register request

app.post('/register',(req,res)=>{//in asynchronous call
    dataService.register(req.body.acno,req.body.username,req.body.password).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})
//login request

app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.password).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})

//deposit request

app.post('/deposit',jwdrouterMiddleware,(req,res)=>{
   dataService.deposit(req.body.acno,req.body.password,req.body.amount).then(
    result=>res.status(result.statusCode).json(result)
   )//to check the values in request which is to dataservices
   
})
//withdraw request

app.post('/withdraw',jwdrouterMiddleware,(req,res)=>{
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount).then(
    result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})
//transaction request

app.post('/transaction',jwdrouterMiddleware,(req,res)=>{
    dataService.getTransaction(req.body.acno).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})
//delete request

app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(
        result=>{res.status(result.statusCode).json(result) }
    )
})