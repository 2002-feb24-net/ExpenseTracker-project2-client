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
  formData:Users;
  list: Users;
  constructor(private http: HttpClient) {

    this.Url = environment.ApiBaseUrl;

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  private data;

  setData(data){
    this.data = data;
    console.log(data);
    return data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    console.log(temp);
    return temp;
   
  }

  clearData(){
    this.data = undefined;
  }
  
  Login(model: any) {
    debugger;
    return this.http.post<any>(this.Url + 'api/Users/', model, { headers: this.header });
  }
  getUsers() {
    return this.http.get<Users[]>(`${this.Url}api/Users/`)
      .toPromise();
  }
  CreateUser(user: Users) {
    return this.http.post<Users>(`${this.Url}api/Users/`, user)
      .toPromise();
  }
  getUsersById()
 {
  return this.http.get<Users>(`${this.Url}api/Users/${this.formData.id}/${this.formData.phoneNumber}`).toPromise();

 }
 refreshList(){
  this.http.get<Users>(`${this.Url}api/Users`)
  .toPromise()
  .then(res => this.list = res as Users);
}
}
