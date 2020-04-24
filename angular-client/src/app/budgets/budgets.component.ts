import { Component, OnInit } from '@angular/core';
import  Budgets  from  '../models/budgets';
import {BudgetsService } from '../budgets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService} from '../subscription.service'
import Subscriptions from '../models/subscriptions';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budgets[] = [];

  subs: Subscriptions[] = [];
  sub: Subscriptions;
  submitted  = false;

  createBudgetForm =this.formBuilder.group({
    text: ['', Validators.required]
  })

  error: string | undefined;
  budget: Budgets;

  constructor(private budgetService: BudgetsService,
    private formBuilder: FormBuilder,
     private toastr: ToastrService, 
     private subService: SubscriptionService) { }

  ngOnInit(): void {
    this.createBudgetForm = this.formBuilder.group ({
      userId: ['', Validators.required],
      estamatedCost: ['', Validators.required],
      actualCost: ['', Validators.required],
      loans: ['', Validators.required],
      subscription: ['', Validators.required],
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

  getBudgetsById() {
    return this.budgetService.getBudgetById()
    .then (
      budgets => {
        this.budgets = budgets
        this.resetError();
      },
      error =>  {
      this.handleError(error);
      }
    );
  }

  createBudget() {
    this.submitted = true;
    const newBudget: Budgets = {
      userId: this.createBudgetForm.get('userId')?.value,
      estimatedCost: this.createBudgetForm.get('estamatedCost')?.value,
       actualCost: this.createBudgetForm.get('actualCost')?.value,
        loans: this.createBudgetForm.get('loans')?.value,
        subscription: this.createBudgetForm.get('subscription')?.value,
    };
    console.log(newBudget);
    this.budgetService.createBudget(newBudget)
    .then(
      budget => {
       if(this.error) {
         this.getBudgetsById();
       } else {
         this.budgets.unshift(budget);
         this.resetError();
       }
      },
      error => this.handleError(error)
    );
  //  var list =  this.getSubsByID();
  //  JSON.stringify(list)
    

  }

  getSubsByID() {
    return this.subService.getSubsByID()
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
