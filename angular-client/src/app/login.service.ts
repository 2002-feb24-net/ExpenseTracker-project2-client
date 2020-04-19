import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Users from './models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Url: string;
  token: string;
  header: any;
  constructor(private http: HttpClient) {

    this.Url = 'https://localhost:5001/';

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  Login(model: any) {
    debugger;
    return this.http.post<any>(this.Url + 'api/Users/id', model, { headers: this.header });
  }
  getUsers() {
    return this.http.get<Users[]>(`${this.Url}api/Users/id`)
      .toPromise();
  }
  CreateUser(user: Users) {
    return this.http.post<Users>(`${this.Url}api/Users/id`, user)
      .toPromise();
  }
}