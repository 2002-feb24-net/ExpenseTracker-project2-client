import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Bills from './models/bills';


@Injectable({
  providedIn: 'root'
})
export class BillService {
  //private baseUrl = environment.notesApiBaseUrl;

  header: any;
  formData:Bills;
  list: Bills;

  private baseUrl = environment.ApiBaseUrl;
  constructor(private http: HttpClient) { }
  getBills() {
    return this.http.get<Bills[]>(`${this.baseUrl}api/Bills/?` + this.formData.userId)
      .toPromise();
  }
  createBills(bill: Bills) {
    return this.http.post<Bills>(`${this.baseUrl}api/Bills`, bill)
      .toPromise();
  }

  getBillById() {
    return this.http.get<Bills>(`${this.baseUrl}api/Bills/` + this.formData.id)
    .toPromise();
  }

  deleteBill() {
    return this.http.delete<Bills>(`${this.baseUrl}api/Bills/` + this.formData.id)
    .toPromise();
  }

  putBill() {
    return this.http.put<Bills>(`${this.baseUrl}api/Bills/` + this.formData.id, this.formData);
  }
}
