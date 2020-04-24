import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../bill.service';
import Bills from '../models/bills';
import Data from '../models/data';

@Component({
  selector: 'app-webcharts',
  templateUrl: './webcharts.component.html',
  styleUrls: ['./webcharts.component.css']
})
export class WebchartsComponent implements OnInit {
  bills: Bills[] = [];
  TotalCosts: Data[] = [];
  error: string | undefined;
  labels: string = '';
  data: string = '';
  finished: boolean = false;
  MostExpensiveMonth: number;
  LeastExpensiveMonth: number;
  MostBoughtItem: string;
  scriptString: string = "";
  months:string[]  = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
 
  tempData: Data = { date: ``, totalcost: 0 , name: ''};
  changed: boolean;
  
  constructor(private billApi: BillService) { }

  ngOnInit(): void {
    this.getBillsByUserID();
  }
  StringBuilder()
  {
    this.TotalCosts.forEach(element => {
      this.labels += "'" + element.date + "',";
      this.data += element.totalcost + ",";
    })
    this.labels = this.labels.substring(0,this.labels.length-1);
    this.data = this.data.substring(0,this.data.length-1);
    console.log(this.labels);
    console.log(this.data);
    this.scriptString = "https://quickchart.io/chart?c={type:'line',data:{labels:["+this.labels+"], datasets:[{label:'Monthly Costs', data: ["+this.data+"], fill:false,borderColor:'blue'}]}}";
    this.finished = true;
  }
  CalculateTotals(){
    this.bills.forEach(element => {
      this.changed = false;
      for (let step = 0; step < this.TotalCosts.length; step++) {
        if(this.TotalCosts[step].date == (`${element.billDate}`).slice(0, 7)){
          this.TotalCosts[step].totalcost += element.cost;
          this.changed = true;
        }
      }
      if(this.changed == false){
        this.tempData = { date: (`${element.billDate}`).slice(0, 7), totalcost: element.cost, name: element.purchaseName };
        this.TotalCosts.push(this.tempData);
      }
      console.log(this.TotalCosts[this.TotalCosts.length-1].totalcost)
    });
    this.LeastExpensiveMonth = Number(this.TotalCosts[0].date.substring(5,7))-1;
    this.MostExpensiveMonth = Number(this.TotalCosts[this.TotalCosts.length-1].date.substring(5,7))-1;
    console.log(this.LeastExpensiveMonth+" "+this.MostExpensiveMonth);
    this.MostBoughtItem = this.TotalCosts[this.TotalCosts.length-1].name;
    this.TotalCosts.sort(this.Compare);
    this.StringBuilder();
  }
  Compare(a:Data,b:Data)
  {
    const dateA = a.date;
    const dateB = b.date;
    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }
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
