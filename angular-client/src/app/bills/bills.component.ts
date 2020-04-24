import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../services/bill.service';
import { CookieService } from 'ngx-cookie-service';
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
  UserID: number = Number(this.cookieService.get('UserID')); //TEMP VAR
  createBillsForm = this.formBuilder.group({
    purchaseName: ['', Validators.required],
    quantity: ['', Validators.required],
    cost: ['', Validators.required],
    billDate: ['', Validators.required],
    location: ['', Validators.required],
  });

  constructor(
    public billApi: BillService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private cookieService: CookieService
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
  populateForm(bill: Bills) {
    this.billApi.formData = Object.assign({}, bill);
  }

  onDeleteB(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.billApi.deleteBillById(id)
        .subscribe(res => {
         
        
          this.toastr.warning('Deleted successfully', 'Subscription cancelled');
        },
          err => {
            debugger;
            console.log(err);
          })
    }}
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
  getBillsByUserID() {
    return this.billApi.getBillsByUserID(this.UserID)
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
      userId: this.UserID,
      purchaseName: this.createBillsForm.get('purchaseName')?.value,
      quantity: this.createBillsForm.get('quantity')?.value,
      cost: this.createBillsForm.get('cost')?.value,
      billDate: this.createBillsForm.get('billDate')?.value,
      location: this.createBillsForm.get('location')?.value,
    };
    console.log(newBills);
    this.billApi.createBills(newBills)
      .then(
        bill => {
          if (this.error) {
            this.getBillsByUserID();
          } 
        },
        error => this.handleError(error) //handles error message
      );
      //location.reload();
  }


}
