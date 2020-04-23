import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Bills from './models/bills';
import Users from './models/users';
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class BillService {
  //private baseUrl = environment.notesApiBaseUrl;
  private baseUrl = environment.ApiBaseUrl;

  constructor(private http: HttpClient, private LoginService : LoginService) { }
  formData:Bills;
  data = this.LoginService.getData();

  getBills() {
    return this.http.get<Bills[]>(`${this.baseUrl}api/Bills`)
      .toPromise();
  }
  createBills(bill: Bills) {
    return this.http.post<Bills>(`${this.baseUrl}api/Bills`, bill)
      .toPromise();
      
  }
  getBillsById()
  {
    console.log(`${this.data}`)
   return this.http.get<Bills[]>(`${this.baseUrl}api/Bills/userid=${this.data}`).toPromise();
 
  }

}
