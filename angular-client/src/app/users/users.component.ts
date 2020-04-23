import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Users from '../models/users';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  submitted = false;
  users: Users[] = [];
  error: string | undefined;

  CreateUserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private CookieService: CookieService, private userApi: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.CookieService.deleteAll();
    this.CreateUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
     
  });
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
  get f() { return this.CreateUserForm.controls; }

  getUsers() {
    return this.userApi.getUsers()
      .then(
        users => {
          this.users = users; //uses promises to accept the api response
          this.resetError(); //resets error message
        },
        error => {
          this.handleError(error); //handles error
        }
      );
  }
  CreateUser() {
    this.submitted = true;
    const newUsers: Users = {
      name: this.CreateUserForm.get('name')?.value,
      password: this.CreateUserForm.get('password')?.value,
      email: this.CreateUserForm.get('email')?.value,
      phoneNumber: this.CreateUserForm.get('phoneNumber')?.value,
      address: this.CreateUserForm.get('address')?.value,
      membership: this.CreateUserForm.get('membership')?.value
    };
    this.userApi.CreateUser(newUsers)
      .then(
        user => {
          if (this.error) {
            this.getUsers();
            this.router.navigate(['/Login']);
          } else {
            this.users.unshift(user); //inserts new element at start of array
            this.resetError(); //clears error message
          }
        },
        error => this.handleError(error) //handles error message
      );
     
  }


}
