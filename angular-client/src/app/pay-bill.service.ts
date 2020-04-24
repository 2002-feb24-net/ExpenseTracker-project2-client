import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Bills from './models/bills';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayBillService {
  Url: string;
  token: string;
  header: any;

  constructor(private http: HttpClient) { 
    this.Url = environment.ApiBaseUrl;

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  Login(model: any) {
    debugger;
    return this.http.post<any>(this.Url + 'api/Bills/', model, { headers: this.header });
  }
  getUsers() {
    return this.http.get<Bills[]>(`${this.Url}api/Bills/`)
      .toPromise();
  }
  CreateUser(bill: Bills) {
    return this.http.post<Bills>(`${this.Url}api/Bills/`, bill)
      .toPromise();
  }
  getUsersById(bill : Bills)
  {
   return this.http.get<Bills[]>(this.Url + bill.id)
   .toPromise();
  }
}
