import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Users from './models/users';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Url: string;
  token: string;
  header: any;
  formData:Users;
  list: Users;
  constructor(private http: HttpClient, private CookieService: CookieService) {

    this.Url = environment.ApiBaseUrl;

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  private data;

  setData(data){

this.CookieService.set("data", data)
    console.log(data)

  }

  getData(){
    
   alert(this.CookieService.get('data'))
  }

  clearData(){
    this.CookieService.deleteAll();
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
 refreshList(){
  this.http.get<Users>(`${this.Url}api/Users`)
  .toPromise()
  .then(res => this.list = res as Users);
}
getUsersById()
 {
  return this.http.get<Users>(`${this.Url}api/Users/${this.formData.id}/${this.formData.phoneNumber}`).toPromise();

 }
  getUsersUpdateById(id : number)
  {
   return this.http.get<Users[]>(this.Url + id)
   .toPromise();
  }
 UpdateUser(user: Users){
  return this.http.put<Users>(`${this.Url}api/Users/${user.id}`, user)
  .toPromise();
 }
}
