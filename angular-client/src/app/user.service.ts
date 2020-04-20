import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Users from './models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 //private baseUrl = environment.notesApiBaseUrl;
 private baseUrl = 'https://localhost:44395/';
 constructor(private http: HttpClient) { }
 getUsers() {
   return this.http.get<Users[]>(`${this.baseUrl}api/Users`)
     .toPromise();
 }
 CreateUser(user: Users){
   return this.http.post<Users>(`${this.baseUrl}api/Users`, user)
     .toPromise();
 }
}
