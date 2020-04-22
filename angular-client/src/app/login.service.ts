import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Users from './models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
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
    return this.http.post<any>('https://localhost:44377/' + 'api/Users/', model, { headers: this.header });
  }
  getUsers() {
    return this.http.get<Users[]>(`${this.Url}api/Users/`)
      .toPromise();
  }
  CreateUser(user: Users) {
    return this.http.post<Users>(`${this.Url}api/Users/`, user)
      .toPromise();
  }
  getUsersById(user : Users)
  {
   return this.http.get<Users[]>('https://localhost:44377/api/Users/' + user.id)
   .toPromise();
  }
}
