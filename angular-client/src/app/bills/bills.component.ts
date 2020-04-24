import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { BillService } from '../bill.service';
import Bills from '../models/bills';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit{
  bills: Bills[] = [];
  error: string | undefined;
  bill: Bills;

  createBillsForm = this.formBuilder.group({
    purchaseName: ['', Validators.required],
    quantity: ['', Validators.required],
    cost: ['', Validators.required],
    billDate: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(
    private billApi: BillService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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

  // getBillsById() {
  //   return this.billApi.getBillsById()
  //     .then(
  //       bills => {
     
  //         this.bills = bills; //uses promises to accept the api response
  //         this.resetError(); //resets error message
         
  //       }, 
  //       error => {
  //         this.handleError(error); //handles error
  //       } 
  //     );
  // }
  getBillsByUserID() {
    return this.billApi.getBillsByUserID()
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
async createBills() {
    const newBills: Bills = {
      userId: this.createBillsForm.get('userId')?.value,
      purchaseName: this.createBillsForm.get('purchaseName')?.value,
      quantity: this.createBillsForm.get('quantity')?.value,
      cost: this.createBillsForm.get('cost')?.value,
      billDate: this.createBillsForm.get('billDate')?.value,
      location: this.createBillsForm.get('location')?.value,
      user: null
    };
   await this.billApi.createBills(newBills)
      .then(
        bill => {
          this.toastr.info('Get By Id successful', 'Get bills by userid');
    
          // this.bill = bill;
          this.getBillsByUserID();
          
        },
        error => this.handleError(error) //handles error message
      );
  }

  }