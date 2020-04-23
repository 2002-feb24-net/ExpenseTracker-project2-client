import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
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
   submitted = false;
  user : Users;
  error: string | undefined;


  errorMessage:string;    
  UserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });
 
 
  CreateUserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,private router: Router,public LoginService:LoginService,private CookieService: CookieService) { }    

  ngOnInit() {    
  this.resetForm();
  this.CookieService.deleteAll();
  this.CreateUserForm = this.formBuilder.group({
    id: ['', Validators.required],
    
    phoneNumber: ['', Validators.required],
   
});
  } 

  get f() { return this.CreateUserForm.controls; }


 
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
  Login() {
    
    this.submitted = true;
 return  this.LoginService.getUsersById().then(
      user => {
        this.toastr.info('Get By Id successfully', 'Get user by id');
    
        this.user = user;
        this.LoginService.setData(this.user.id);
       
if(this.user.id == 24 && this.user.phoneNumber == "1234567890")
  {
    this.router.navigate(['/Page']);
  }
  else{
    this.router.navigate(['/Bills']);
  }
   
      },
      error => {
        this.toastr.error('wrong Id or Phone number', 'Get user by id');
        this.handleError(error);
        console.log(error);
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


                                               
  
      
}