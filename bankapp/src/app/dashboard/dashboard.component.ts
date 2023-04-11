import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  acno:any;
  pswd:any;
  amount:any
  acno1:any;
  pswd1:any;
  amount1:any;
  //to hold current username
  user:any;
  sdate:any;



  constructor(private ds:DataService,private fb:FormBuilder,private router:Router,private http:HttpClient){
    //to get name of user
    if(localStorage.getItem('currentUser')){
      this.user = JSON.parse(localStorage.getItem('currentUser')||'')
      this.sdate = Date()
    }

  }
  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('Please Login first')
      this.router.navigateByUrl('')
    }
  }

  depForm = this.fb.group({//group
    //array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })

  withForm = this.fb.group({//group
    //array
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  deposit(){
    var acno=this.depForm.value.acno;
    var pswd = this.depForm.value.pswd;
    var amount = this.depForm.value.amount;
    if(this.depForm.valid){
    this.ds.deposit(acno,pswd,amount).subscribe((result:any)=>{
      
      //response
      alert(result.message);
    },
    (result:any)=>{
      alert(result.error.message)
    }
    )
    }
  }
  withdraw(){
    var acno=this.withForm.value.acno1;
    var pswd = this.withForm.value.pswd1;
    var amount = this.withForm.value.amount1;
    console.log(amount);
    
    if(this.withForm.valid){
      this.ds.withdraw(acno,pswd,amount).subscribe((result:any)=>{
        //response
        alert(result.message)
      },
      (result:any)=>{
        alert(result.error.message)
      }
      )
    }
  }
  logout(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('Token')
    this.router.navigateByUrl('')
  }
  dele(){
    this.acno = JSON.parse(localStorage.getItem('currentAcno')||'')
    
  }
  oncancel(){
    this.acno=""
  }
  onDelete(event:any){
    // alert(event)
    this.ds.deleteAcc(event).subscribe(
      (result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
      },
      (result:any)=>{
        alert(result.error.message)
      }
    )
  }
}
