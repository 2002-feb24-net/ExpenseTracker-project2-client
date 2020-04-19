import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Bills from './models/bills';


@Injectable({
  providedIn: 'root'
})
export class BillService {
  //private baseUrl = environment.notesApiBaseUrl;
  private baseUrl = 'https://localhost:5001/';
  constructor(private http: HttpClient) { }
  getBills() {
    return this.http.get<Bills[]>(`${this.baseUrl}api/Bills`)
      .toPromise();
  }
  createBills(bill: Bills){
    return this.http.post<Bills>(`${this.baseUrl}api/Bills`, bill)
      .toPromise();
  }
}
