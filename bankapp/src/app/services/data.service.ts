import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//global http header objects

const options = {
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root',


})
export class DataService {
  //to hold username
  currentUser:any;

    //to hold acno
  currentAcno:any;

  userDetails:any={
    1000:{acno:1000,username:'amal',password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,username:'sam',password:1001,balance:7000,transaction:[]},
    1002:{acno:1002,username:'sherry',password:1002,balance:5000,transaction:[]}
  }//inject httpclient
  constructor(private http:HttpClient) { 

  }

  saveDetails(){
    //database

    if(this.userDetails){
      localStorage.setItem('Database',JSON.stringify(this.userDetails))
    }
    if(this.userDetails){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    //current acno
    if(this.userDetails){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }

  // getdetails(){
  //   //database
  //   if(localStorage.getItem('Database')){
  //     this.userDetails = JSON.parse(localStorage.getItem('Database')||'')
  //   }
  //   //currentacno
  //   if(localStorage.getItem('currentAcno')){
  //     this.currentAcno = JSON.parse(localStorage.getItem('currentAcno')||'')
  //   }
  //   //currentUser
  //   if(localStorage.getItem('currentUser')){
  //     this.currentUser= JSON.parse(localStorage.getItem('currentUser')||'')
  //   }
  // }
  //api call for register
  register(acno:any,username:any,password:any){
    const body = {
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register',body)
  }//login call
  login(acno:any,password:any){
    const body = {
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',body)

  }
  getToken(){
    //fetch token from localstorage
    const token = JSON.parse(localStorage.getItem('Token')||'')
    
    //generate header
    let headers = new HttpHeaders()
    //append token inside the header
    if(token){
      options.headers=headers.append('x-acess-token',token)
    }
    return options
  }    
  //deposit call

  deposit(acno:any,password:any,amt:any){  
    var amount = parseInt(amt)
    const body ={
      acno,
      password,
      amount
    }  
    return this.http.post('http://localhost:3000/deposit',body,this.getToken()) 
  }
  //withdraw call

  withdraw(acno:any,password:any,amt1:any){
    var amount = parseInt(amt1)
    const body ={
      acno,
      password,
      amount
    }
    console.log(body);
    return this.http.post('http://localhost:3000/withdraw',body,this.getToken())
  }
  //transaction call

  getTransaction(acno:any){
    const body = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction',body,this.getToken())
  }
  //delete call
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }
}

