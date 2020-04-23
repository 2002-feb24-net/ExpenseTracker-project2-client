import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SubscriptionService } from '../subscription.service';
import Subscriptions from '../models/subscriptions';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  //need to change this later vvvvvv
  UserID : number = 2; //temp
  subs: Subscriptions[] = [];
  error: string | undefined;
  constructor(private subApi: SubscriptionService) { }

  ngOnInit(): void {
    this.getSubsByUserID();
  }
  getSubsByUserID()
  {
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
}
