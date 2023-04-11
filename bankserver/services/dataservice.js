//import jsonwebtoken

const jwt = require('jsonwebtoken');


//impport db.js

const db = require('./db')


// userDetails={
//     1000:{acno:1000,username:'amal',password:1000,balance:2000,transaction:[]},
//     1001:{acno:1001,username:'sam',password:1001,balance:7000,transaction:[]},
//     1002:{acno:1002,username:'sherry',password:1002,balance:5000,transaction:[]}
//   }

  const register =(acno,username,password)=>{
    return db.User.findOne({acno}).then(//asynchronous call
      user=>{
        if(user){
          return{
            status:false,
            statusCode:400,
            message:'User already exists'
          }
        }else{
          const newuser = new db.User({
            acno:acno,
            username:username,
            password:password,
            balance:0,
            transaction:[]
          })
          newuser.save()//to save new data to mongodb
          return {
            status:true,
            statusCode:200,
            message:'register sucessfull'
          }
        }
      }
    )
    //using userdetails data
    // if(acno in userDetails){
    //   return {
    //     status:false,
    //     statusCode:400,
    //     message:'User already exists'
    //   }
    // }else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   return {
    //     status:true,
    //     statusCode:200,
    //     message:'register sucessfull'
    //   }
    // }
  }

  const login = (acno,password)=>{
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          currentUser = user.username 
          currentAcno = acno;
          //token generate
          const token =jwt.sign({currentAcno:acno},'superkey2023')
          //superkey2023 like gsiens485ehyw53geu3353
          return {
            status:true, 
            currentAcno:currentAcno,
            currentUser:currentUser,
            statusCode:200,
            message:'login sucessfull',
            token:token
          }
        }
        else{
          return {
            status:false,
            statusCode:400,
            message:'Invalid password'
          }
        }
      }
    )
  }  
  const deposit = (acno,password,amount)=>{
    var amount = parseInt(amount)
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          if(password==user.password){
            user.balance += amount;
            user.transaction.push({type:'Credit',amount})
            user.save()
            return {
              status:true,
              statusCode:200,
              message:`${amount} is credited and balance is ${user.balance}`
            }
          }
          else{
            return {
              status:false,
              statusCode:400,
              message:'Invalid password'
            }
          }
          
        }
        else{
          return {
            status:false,
            statusCode:400,
            message:'Invalid user details'
          }
        }
      }
    )
  }

  const withdraw = (acno,password,amount)=>{
    console.log(acno,password,amount);
    var amount = parseInt(amount)
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          if(password==user.password){
            user.balance -= amount;
            user.transaction.push({type:'Dedit',amount})
            user.save()
            return {
              status:true,
              statusCode:200,
              message:`${amount} is debited and balance is ${user.balance}`
            }
          }
          else{
            return {
              status:false,
              statusCode:400,
              message:'Invalid Password'
            }
          }
        }
        else{
          return {
            status:false,
            statusCode:400,
            message:'Invalid User Details'
          }
        }
      }
    )
  }

  const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return {
            status:true,
            statusCode:200,
            transaction:user.transaction
        }
        }
        else{
          return {
            status:false,
            statusCode:400,
            message:'User not found'
        }
        }
      }
    )
}
//delete transaction

 const deleteAcc=(acno)=>{
  return db.User.findOneAndDelete({acno}).then(
    user=>{
      if(user){
        return {
          status:true,
          statusCode:200,
          message:'User Deleted'
      }
      }
      else{
        return {
          status:false,
          statusCode:400,
          message:'User not found'
      }
      }
    
  })
}

  //to get register in other backend files
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }