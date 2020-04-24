import { Component, OnInit, Input, HostListener, InjectionToken } from '@angular/core';
import { UserService } from '../user.service';
import Users from '../models/users';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
  providers: [FormBuilder,Validators,NgForm]
  
})

export class MembershipComponent implements OnInit {
  user: Users;
  UserID: number = 2; //TEMP CHANGE THIS
  confirm: boolean = false;
  constructor(private formBuilder: FormBuilder,
    public MemberService:UserService) { }

  ngOnInit(): void {
    this.Login();
  }
  Login() {
    return  this.MemberService.getUsersUpdateById().then(
         user => {
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
          console.log(`Updated user with id=${this.UserID}`);
        },
        err => {
          console.log(err);
        }
      )
     }
     openCheckout() {
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_SasKUYWft8itac2sDa8JxpJY00mPgLFqdB',
        locale: 'auto',
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
        }
      });
  
      handler.open({
        name: 'Demo Site',
        description: '2 widgets',
        amount: 2000
      });
  
    }
}
