import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { BudgetsService } from '../budgets.service';
import Budgets from '../models/budgets';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budgets[] = [];
  error: string;

  createBudgetForm = this.formBuilder.group({
    userId : ['', Validators.required],
    estimatedCost: ['', Validators.required],
    actualCost: ['', Validators.required],
    subscription: ['', Validators.required],
    loan : ['', Validators.required],
  });

  constructor(
    private budgetsApi: BudgetsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBudgets();
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

  getBudgets() {
    return this.budgetsApi.getBudgets()
  }

}
