import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { BillService } from '../bill.service';
import Bills from '../models/bills';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit{
  bills: Bills[] = [];
  bill: Bills;
  error: string | undefined;

  createBillsForm = this.formBuilder.group({
    userId: ['', Validators.required],
    purchaseName: ['', Validators.required],
    quantity: ['', Validators.required],
    cost: ['', Validators.required],
    billDate: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(
    private billApi: BillService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBillsById();
    
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

  getBillsById() {
    return this.billApi.getBillsById()
      .then(
        bills => {
     
          this.bills = bills; //uses promises to accept the api response
          this.resetError(); //resets error message
          console.log("t"+ this.bill);
          console.log(bills)
          console.log(this.bill.userId)
        }, 
        error => {
          this.handleError(error); //handles error
        } 
      );
  }
  createBills() {
    const newBills: Bills = {
      userId: this.createBillsForm.get('userId')?.value,
      purchaseName: this.createBillsForm.get('purchaseName')?.value,
      quantity: this.createBillsForm.get('quantity')?.value,
      cost: this.createBillsForm.get('cost')?.value,
      billDate: this.createBillsForm.get('date')?.value,
      location: this.createBillsForm.get('location')?.value,
      user: null
    };
    this.billApi.createBills(newBills)
      .then(
        bill => {
          if (this.error) {
            this.getBillsById();
          } else {
            this.bills.unshift(bill); //inserts new element at start of array
            this.resetError(); //clears error message
          }
        },
        error => this.handleError(error) //handles error message
      );
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.billApi.formData = {
      id: 0,
      userId: this.bill.userId,
      purchaseName: '',
      quantity: 0,
      cost: 0,
      billDate: null,
      location: '',
    }
  }
}