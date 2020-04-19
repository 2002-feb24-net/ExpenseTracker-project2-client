import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../bill.service';
import Bills from '../models/bills';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit{
  bills: Bills[] = [];
  error: string | undefined;

  createBillsForm = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(
    private billApi: BillService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBills();
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

  getBills() {
    return this.billApi.getBills()
      .then(
        bills => {
          this.bills = bills; //uses promises to accept the api response
          this.resetError(); //resets error message
        }, 
        error => {
          this.handleError(error); //handles error
        } 
      );
  }
  createBills() {
    const newBills: Bills = {
      userId: this.createBillsForm.get('userid')?.value,
      purchaseName: this.createBillsForm.get('purchasename')?.value,
      quantity: this.createBillsForm.get('quantity')?.value,
      cost: this.createBillsForm.get('value')?.value,
      billDate: this.createBillsForm.get('date')?.value,
      location: this.createBillsForm.get('location')?.value
    };
    this.billApi.createBills(newBills)
      .then(
        bill => {
          if (this.error) {
            this.getBills();
          } else {
            this.bills.unshift(bill); //inserts new element at start of array
            this.resetError(); //clears error message
          }
        },
        error => this.handleError(error) //handles error message
      );
  }


}
