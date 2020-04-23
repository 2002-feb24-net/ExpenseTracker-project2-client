import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { BudgetsService } from '../budgets.service';
import { BillService } from '../bill.service'
import Budgets from '../models/budgets';
import  Bills  from '../models/bills'

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  bills: Bills[] = [];
  budgets: Budgets[] = [];

  budget: Budgets;
  bill: Bills;

  error: string;
  errorMessage: string

  createBudgetForm = this.formBuilder.group({
    userId : ['', Validators.required],
    estimatedCost: ['', Validators.required],
    actualCost: ['', Validators.required],
    subscription: ['', Validators.required],
    loan : ['', Validators.required],
  });
  toastr: any;

  constructor(
    public payBillService : BillService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.resetForm()
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

  SubmitPay(f: NgForm) {
    return this.payBillService.getBillById().then(
      bill => {
        // this.toastr.info("Get by id was OK", "Get bill by Id");
        this.bill = bill;
        console.log(this.bills)
          console.log(f)
      },
      err => {
        console.log(err);
      }
    )
  }


  populateForm(id) {
    this.payBillService.formData = Object.assign({}, id);
  }

  resetForm(form?: NgForm) {
    if(form != null)
      form.form.reset();
    this.payBillService.formData = {
      id:  0,
      userId: 0,
      purchaseName: '',
      quantity : 0,
      cost: 0,
      billDate : new Date(Date.now()),
      location : '',
    }
  }

}
