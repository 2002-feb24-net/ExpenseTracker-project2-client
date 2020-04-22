import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Users from './models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 //private baseUrl = environment.notesApiBaseUrl;
 header: any;
 formData:Users;
 list: Users;
 private baseUrl = 'https://localhost:44395/';
 constructor(private http: HttpClient) {
   
  const headerSettings: { [name: string]: string | string[]; } = {};
  this.header = new HttpHeaders(headerSettings);
  }
 getUsers() {
   return this.http.get<Users[]>(`${this.baseUrl}api/Users`)
     .toPromise();
 }
 getUsersById()
 {
  return this.http.get<Users>(`${this.baseUrl}api/Users/` + this.formData.id).toPromise();

 }
 CreateUser(user: Users){
   return this.http.post<Users>(`${this.baseUrl}api/Users`, user)
     .toPromise();
 }
 refreshList(){
  this.http.get<Users>(`${this.baseUrl}api/Users`)
  .toPromise()
  .then(res => this.list = res as Users);
}
}
