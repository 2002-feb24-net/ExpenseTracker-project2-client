import { Component, OnInit } from '@angular/core';
import  Budgets  from  '../models/budgets';
import {BudgetsService } from '../budgets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budgets[] = [];
  error: string | undefined;
  budget: Budgets;

  createBudgetForm = this.formBuilder.group ({
    userId: ['', Validators.required],
    estamatedCost: ['', Validators.required],
    actualCost: ['', Validators.required],
    loans: ['', Validators.required],
    subscription: ['', Validators.required],
  })

  constructor(private budgetService: BudgetsService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBudgetsById();
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
  
  // createBudget() {
  //   const newBudget: Budgets = {
  //     userId: this.createBudgetForm.get('userId')?.value,
  //     estimatedCost: this.createBudgetForm.get('estamatedCost')?.value,
  //     actualCost: this.createBudgetForm.get('actualCost')?.value,
  //     loans: this.createBudgetForm.get('loans')?.value,
  //     subscription: this.createBudgetForm.get('')?.value,
  //     users: null,
  // };
  // this.budgetService.createBudget(newBudget)
  // .th

  createBudget() {
    const newBudget: Budgets = {
      userId: this.createBudgetForm.get('userId')?.value,
       estimatedCost: this.createBudgetForm.get('estamatedCost')?.value,
       actualCost: this.createBudgetForm.get('actualCost')?.value,
      loans: this.createBudgetForm.get('loans')?.value,
       subscription: this.createBudgetForm.get('')?.value,
       users: null,
    };
    this.budgetService.createBudget(newBudget)
    .then(
      budget => {
        this.toastr.info("yes", "yes");
        this.budget = budget;
        this.getBudgetsById();
      },
      error => this.handleError(error)
    );
  }

}
