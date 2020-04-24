import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Users from './models/users';
import { environment } from 'src/environments/environment';

import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class UserService {

 //private baseUrl = environment.notesApiBaseUrl;
 UserID: number = 2; //TEMP CHANGE THIS
 header: any;
 formData:Users;
 list: Users;
 
 constructor(private http: HttpClient,private CookieService: CookieService) {
   
  const headerSettings: { [name: string]: string | string[]; } = {};
  this.header = new HttpHeaders(headerSettings);
  }

 private baseUrl = environment.ApiBaseUrl;


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
 getUsersUpdateById()
 {
 const  data=this.CookieService.get('data');
  return this.http.get<Users>(`${this.baseUrl}api/Users/${data}`)
  .toPromise();
 }
UpdateUser(user: Users){
  const  data=this.CookieService.get('data');
 return this.http.put<Users>(`${this.baseUrl}api/Users/${data}`, user)
 .toPromise();
}
 refreshList(){
  this.http.get<Users>(`${this.baseUrl}api/Users`)
  .toPromise()
  .then(res => this.list = res as Users);
}
}