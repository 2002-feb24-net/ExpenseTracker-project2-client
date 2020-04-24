import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../services/subscription.service';
import Subscriptions from '../models/subscriptions';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subs: Subscriptions[] = [];
  sub: Subscriptions;
  error: string | undefined;
  submitted = false;
  UserID: number = 2;
 createSubsForm = this.formBuilder.group({
    company: ['', Validators.required],
    subscriptionName: ['', Validators.required],
    subscriptionMonthCost: ['', Validators.required],
    subscriptionDate: ['', Validators.required],
    subscriptionDueDate: ['', Validators.required],
    notification: ['', Validators.required]
  });

  constructor(
    private subApi: SubscriptionService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.UserID = Number(this.cookieService.get('UserID'));
  }
  populateForm(sub: Subscriptions) {
    this.subApi.formData = Object.assign({}, sub);
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
  // get f() { return this.createSubsForm.controls; }
  getSubsByID() {
    return this.subApi.getSubsByID()
      .then(
        subs => {
          this.subs = subs; //uses promises to accept the api response
          this.resetError(); //resets error message
        }, 
        error => {
          this.handleError(error); //handles error
        } 
      );
  }
  createSubs() {
    this.submitted = true;
    const newSubs: Subscriptions = {
      userId: this.UserID,
      company: this.createSubsForm.get('company')?.value,
      subscriptionName: this.createSubsForm.get('subscriptionName')?.value,
      subscriptionMonthCost: this.createSubsForm.get('subscriptionMonthCost')?.value,
      subscriptionDate: this.createSubsForm.get('subscriptionDate')?.value,
      subscriptionDueDate: this.createSubsForm.get('subscriptionDueDate')?.value,
      notification: this.createSubsForm.get('notification')?.value,
    };
    this.subApi.createSubs(newSubs)
      .then(
        sub => {
          if (this.error) {
            //this.toastr.info('Get By Id successful', 'Get subs by userid');
    
          this.sub = sub;
          this.getSubsByUserID();
       
          }
        },
        error => this.handleError(error) //handles error message
      );
  }
 getSubsByUserID()
 {
   return this.subApi.getSubsByUserID(this.UserID)
     .then(
       subs => {
         this.subs = subs; //uses promises to accept the api response
         this.resetError(); //resets error message
       }, 
       error => {
         this.handleError(error); //handles error
       } 
     );
  }
  onDeleteS(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.subApi.deleteSubById(id)
        .subscribe(res => {
          debugger;
        
          this.toastr.warning('Deleted successfully', 'Subscription cancelled');
        },
          err => {
            debugger;
            console.log(err);
          })
    }
    }
  
}
