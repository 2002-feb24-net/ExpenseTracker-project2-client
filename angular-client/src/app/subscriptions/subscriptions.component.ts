import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../subscription.service';
import Subscriptions from '../models/subscriptions';
import { ToastrService } from 'ngx-toastr';

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
  UserID: number = 2; //CHANGE THIS LATER TO A COOKIE OR SOMETHING
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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSubsByUserID();
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
  get f() { return this.createSubsForm.controls; }
  getSubs() {
    return this.subApi.getSubs()
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
      user: null
    };
    this.subApi.createSubs(newSubs)
      .then(
        sub => {
          if (this.error) {
            this.toastr.info('Get By Id successful', 'Get subs by userid');
    
          this.sub = sub;
          this.getSubs();
       
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
}
