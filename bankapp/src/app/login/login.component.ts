import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd executed
  //class is a collection of properties and methods
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder){}//1st executed
                  //used for object intialization
                  //it automatically invokes when object is created

  ngOnInit(): void {
                  //2nd executed
                  //initial process of component
                  //when a component is created,at same time initialized or authorized
                  //when a component is created,there is a lifecycle for it
                }
  //properties
  loginForm = this.fb.group({//group
    //array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })
    //control pases through html page

  aim = 'Your perfect banking partner'

  account = 'please enter your account no'
  //data
  // userDetails:any={
  //   1000:{acno:1000,username:'amal',password:1000,balance:2000},
  //   1001:{acno:1001,username:'sam',password:1001,balance:7000},
  //   1002:{acno:1002,username:'sherry',password:1002,balance:5000}
  // }
  // acno:any
  //to hold value from user
  acno:any
  pswd:any
  //userdefined functions//4th executed
  // login(a:any,p:any){
  //   // alert('login clicked')
  //   // var acno =this.acno
  //   // var pswd = this.pswd
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetails = this.userDetails;
  //   if(acno in userDetails){
  //     if(pswd == userDetails[acno].password){//['password']
  //       alert('Login Sucessfull')
  //     }else{
  //       alert('Incorrect Password')
  //     }
  //   }else{
  //     alert('Account not found')
  //   }
  // }
  login(){
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    
    if(this.loginForm.valid){
    this.ds.login(acno,pswd).subscribe(
      (result:any)=>{        
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('Token',JSON.stringify(result.token))
        alert(result.message)
        this.router.navigateByUrl('dashboard')
        },
          result=>{
            alert(result.error.message)
          }
      )}
    
      else{
        alert('Login Failure')
        console.log(this.loginForm.get('uname')?.errors);
      }
    }
  }
  // acnoChange(event:any){
  //   // console.log(event.target.value);
  //   this.acno = event.target.value
  //   console.log(this.acno); 
  // }
  // pswrdChange(event:any){
  //   // console.log(event.target.value);
  //   this.pswd = event.target.value
  //   console.log(this.pswd);   
  // }

