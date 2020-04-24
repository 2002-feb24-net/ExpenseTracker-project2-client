import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Users from '../models/users';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
   users: Users[] = [];
  UserID: number | undefined;
  user : Users;
  error: string | undefined;


  errorMessage:string;    
  UserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });
 
  constructor(private formBuilder: FormBuilder,private router: Router,
    private toastr: ToastrService,public LoginService:UserService,private cookieService: CookieService) { }    

  ngOnInit() {    
    this.resetForm();
    
  } 

  populateForm(id) {
    this.LoginService.formData = Object.assign({}, id);
  }

  // getUsersById(){
  //   return this.LoginService.getUsersById()
  //     .then(
  //       users => {
        
  //         this.users = users; //uses promises to accept the api response
        
  //       },
  //       error => {
  //         this.handleError(error); //handles error
  //       }
  //     );
  // }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.LoginService.formData = {
      id: 0,
      name: '',
      phoneNumber: '',
      email: '',
      address:'',
      password:'',
      membership: false,
    }
  }
  Login(f: NgForm) {
 return  this.LoginService.getUsersById().then(
      user => {
        this.toastr.info('Get By Id successfully', 'Get user by id');
        this.user = user;
        //console.log(users);
        this.cookieService.set('UserID',`${this.user.id}`);
       console.log(this.users)
        console.log(f)
        if(this.user.id == 24 && this.user.phoneNumber == "1234567890")
  {
    this.router.navigate(['/Page']);
  }
  else{
    this.router.navigate(['/Bills']);
  }
   
      },
      err => {
        console.log(err);
      }
    )
  }

    // return this.LoginService.getUsersById(f.value)
    
    //   .then(
    //     users => {
    //   console.log(users)
    //       this.users = users; //uses promises to accept the api response
    //       this.resetError(); //resets error message
    //     }, 
    //     error => {
    //       this.handleError(error); //handles error
    //     } 
    //   );
  
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