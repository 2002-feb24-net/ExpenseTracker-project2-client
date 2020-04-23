import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from '../bill.service';
import Bills from '../models/bills';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-select-bill',
  templateUrl: './select-bill.component.html',
  styleUrls: ['./select-bill.component.css']
})
export class SelectBillComponent implements OnInit {
  bills: Bills[] = [];
  userPay: Number;

  bill:Bills;
  error: string | undefined;
  errorMessage:string;
  UserForm = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,public SelectBillService:BillService) { }

  ngOnInit(): void {
  }

  populateForm(id) {
    this.SelectBillService.formData = Object.assign({}, id);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.SelectBillService.formData = {
      id: 0,
      userId: 0,
      purchaseName: '',
      quantity: 0,
      cost: 0,
      billDate: new Date(Date.now()),
      location: ''
    }
  }

  EnterBillId(f: NgForm) {
    return  this.SelectBillService.getBillById().then(
         bill => {
           this.toastr.info('Get By Id successfully', 'Get bill by id');
           this.bill = bill;
           //console.log(users);
          console.log(this.bills)
           console.log(f)
         },
         err => {
           console.log(err);
         }
       )
     }
     SubmitPay(f: NgForm) {
       if(this.userPay === this.bill.cost) {
        return this.SelectBillService.deleteBill().then(
          bill => {
            this.toastr.info("Bill delete was successfully", "User paid correcly");
            this.bill = bill;
            console.log("Bill is no longer here");
          }
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
