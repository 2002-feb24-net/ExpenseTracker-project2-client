import { Component, OnInit, Input, HostListener, InjectionToken } from '@angular/core';
import { UserService } from '../services/user.service';
import Users from '../models/users';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
  providers: [FormBuilder,Validators,NgForm]
  
})

export class MembershipComponent implements OnInit {
  user: Users;
  UserID: number; //TEMP CHANGE THIS
  confirm: boolean = false;
  constructor(private formBuilder: FormBuilder,
    public MemberService:UserService, private cookieService: CookieService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.UserID = 32;
    this.Login();
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
