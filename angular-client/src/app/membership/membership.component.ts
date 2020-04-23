import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import Users from '../models/users';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})

export class MembershipComponent implements OnInit {
  user: Users;
  UserID: number = 2; //TEMP CHANGE THIS
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,public MemberService:UserService) { }

  ngOnInit(): void {
    this.Login();
  }
  Checkout(e) {
    const user = this.user;
    e.preventDefault();
  }
  Login() {
    return  this.MemberService.getUsersUpdateById(this.UserID).then(
         user => {
           this.toastr.info('Get By Id successfully', 'Get user by id');
           this.user = user;
         },
         err => {
           console.log(err);
         }
       )
     }
     Purchase(){
      this.user.membership = true;
      return this.MemberService.UpdateUser(this.user).then(
        user => {
          console.log(`Updated user with id=${user.id}`);
        },
        err => {
          console.log(err);
        }
      )
     }
}
