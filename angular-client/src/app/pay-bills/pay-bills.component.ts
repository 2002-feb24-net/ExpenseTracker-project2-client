import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../services/bill.service';
import Bills from '../models/bills';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.css']
})
export class PayBillsComponent implements OnInit {
  bills: Bills[] = [];
  userPay: number;
  header: any;
  

  bill:Bills;
  error: string | undefined;
  errorMessage:string;
  UserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,public PayBillService:BillService) {

      const headerSettings: { [name: string]: string | string[]; } = {};
  this.header = new HttpHeaders(headerSettings);
     }

  ngOnInit(): void {
    this.resetForm();
  }

  populateForm(id) {
    this.PayBillService.formData = Object.assign({}, id);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.PayBillService.formData = {
      id: 0,
      userId: 0,
      purchaseName: '',
      quantity: 0,
      cost: 0,
      billDate: new Date(Date.now()),
      location: ''
    }
  }

  getBills() {
    return this.PayBillService.getBills()
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

  // Gets the Bill Id bassed on what the user Types
  onKey(event: any) {
    return this.PayBillService.getBillById()
    .then (
      bill => {
        this.bill = bill;
        alert(this.bill.cost)
        this.resetError();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  SubmitPay(f: NgForm) {
    if(this.userPay === this.bill.cost) {
     return this.PayBillService.putBill().subscribe(
       bill => {
        bill.purchaseName += " (Purchased)";
         this.toastr.info("Pay was successfully", "User paid correcly");
         this.bill = bill;
         
         console.log("Bill is no longer here");
         console.log(f);
       },
     )
    }
    else {
      return alert("Please enter more");
    }
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
