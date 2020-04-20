import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Users from '../models/users';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  users: Users[] = [];
  model : any={};    
  login : Users;
  error: string | undefined;
  idw = this.model.id;

  errorMessage:string;    
  UserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });
 
  constructor(private formBuilder: FormBuilder,private router:Router,private LoginService:UserService) { }    

  ngOnInit() {    
    sessionStorage.removeItem('Name');    
    sessionStorage.clear();    
    
  } 


  // getUsersById(f : NgForm){
  //   return this.LoginService.getUsersById(f.value)
  //     .then(
  //       users => {
  //         this.users = users; //uses promises to accept the api response
  //       console.log(f.value)
  //       },
  //       error => {
  //         this.handleError(error); //handles error
  //       }
  //     );
  // }


  Login(f: NgForm) {
 

    return this.LoginService.getUsersById(f.value)
    
      .then(
        users => {
      
          this.users= users; //uses promises to accept the api response
          this.resetError(); //resets error message
        }, 
        error => {
          this.handleError(error); //handles error
        } 
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.error = `An error occurred: ${error.error.message}`; //in the event of a network error. Add error message.
    } else {
      this.error = `Backend returned code ${error.status}, body was: ${error.error}`; //If the response status code was an error then display said error
    }
  }

  resetError() {
    this.error = undefined; //clears error message
  }
                                                  //login method to be implemented
   
  
      
}