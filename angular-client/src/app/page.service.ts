import { Injectable } from '@angular/core';
import Users from './models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {
formData:Users;
private Url = 'https://localhost:44395/';
token: string;
header: any;
list: Users[];
constructor(private http: HttpClient) {

 

  const headerSettings: { [name: string]: string | string[]; } = {};
  this.header = new HttpHeaders(headerSettings);
}
// postUser() {
//   return this.http.post(`${this.Url}api/Users/`, this.formData);
// }
putUser() {
  return this.http.put<Users>(`${this.Url}api/Users/`+ this.formData.id, this.formData);
}

  deleteUser(id) {
    return this.http.delete<Users>(`${this.Url}api/Users/`+ id, { headers: this.header });
  }
refreshList(){
  this.http.get<Users[]>(`${this.Url}api/Users`)
  .toPromise()
  .then(res => this.list = res as Users[]);
}
 }