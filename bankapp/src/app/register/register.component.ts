import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder){}//database from services

  ngOnInit():void{}

  // userDetails:any={
  //   1000:{acno:1000,username:'amal',password:1000,balance:2000},
  //   1001:{acno:1001,username:'sam',password:1001,balance:7000},
  //   1002:{acno:1002,username:'sherry',password:1002,balance:5000}
  // }
  //model for register
  registerForm = this.fb.group({//group
    //array
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })
  //control pases through html page

  uname:any
  acno:any
  pswd:any
  register(){
        
    var uname = this.registerForm.value.uname;
    var acno = this.registerForm.value.acno;
    var pswd = this.registerForm.value.pswd
    if(this.registerForm.valid){
    this.ds.register(acno,uname,pswd).subscribe(
      (result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      }
    )
    }
    else{
      alert('register Failure')
      console.log(this.registerForm.get('uname')?.errors);      
    }
    }
  }

