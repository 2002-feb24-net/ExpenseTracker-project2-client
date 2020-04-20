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
  submitted = false;
  users: Users[] = [];
  error: string | undefined;

  CreateUserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });
  router: any;

  constructor(private formBuilder: FormBuilder, private userApi: UserService) { }

  ngOnInit(): void {
    this.CreateUserForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', Validators.required],
      Address: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
     
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
      Name: this.CreateUserForm.get('Name')?.value,
      Password: this.CreateUserForm.get('Password')?.value,
      Email: this.CreateUserForm.get('Email')?.value,
      PhoneNumber: this.CreateUserForm.get('PhoneNumber')?.value,
      Address: this.CreateUserForm.get('Address')?.value,
      Membership: this.CreateUserForm.get('Membership')?.value
    };
    this.userApi.CreateUser(newUsers)
      .then(
        user => {
          if (this.error) {
            this.getUsers();
            this.router.navigate(['/login']);
          } else {
            this.users.unshift(user); //inserts new element at start of array
            this.resetError(); //clears error message
          }
        },
        error => this.handleError(error) //handles error message
      );
  }


}
