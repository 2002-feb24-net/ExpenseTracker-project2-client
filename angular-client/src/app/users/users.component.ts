import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Users from '../models/users';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Users[] = [];
  error: string | undefined;

  CreateUserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private userApi: UserService) { }

  ngOnInit(): void {
    this.getUsers();
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
    const newUsers: Users = {
      Name: this.CreateUserForm.get('Name')?.value,
      Password: this.CreateUserForm.get('Password')?.value,
      Email: this.CreateUserForm.get('Email')?.value,
      ContactNo: this.CreateUserForm.get('Contact No')?.value,
      Address: this.CreateUserForm.get('Address')?.value,
      Membership: this.CreateUserForm.get('Membership')?.value
    };
    this.userApi.CreateUser(newUsers)
      .then(
        user => {
          if (this.error) {
            this.getUsers();
          } else {
            this.users.unshift(user); //inserts new element at start of array
            this.resetError(); //clears error message
          }
        },
        error => this.handleError(error) //handles error message
      );
  }


}
