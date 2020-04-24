import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Bills from '../models/bills';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class BillService {
  //private baseUrl = environment.notesApiBaseUrl;
  private baseUrl = environment.ApiBaseUrl;

  constructor(private http: HttpClient,private CookieService: CookieService) { }
  formData:Bills;
  
  
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
    console.log(this.CookieService.get('data'))
    const data=this.CookieService.get('data');
   return this.http.get<Bills[]>(`${this.baseUrl}api/Bills/userid=${data}`).toPromise();
 
  }
  getBillsByUserID(id: number){
     return this.http.get<Bills[]>(`${this.baseUrl}api/Bills/userid=${id}`)
       .toPromise();
  }
  deleteBillById(id: number) {
    return this.http.delete<Bills>(`${this.baseUrl}api/Bills/`+ id);
  }
}