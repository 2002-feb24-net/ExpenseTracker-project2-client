import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Subscription from './models/subscriptions';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  header: any;
  formData:Subscription;
  private baseUrl = environment.ApiBaseUrl;
  constructor(private http: HttpClient,private CookieService: CookieService, private LoginService : LoginService,) { 
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  
  }
 
  
  getSubsByID() {
    const data=this.CookieService.get('data');
    return this.http.get<Subscription[]>(`${this.baseUrl}api/Subscriptions/userid=${data}`).toPromise();
      
  }
  createSubs(sub: Subscription){
    return this.http.post<Subscription>(`${this.baseUrl}api/Subscriptions`, sub)
      .toPromise();
  }
 
  // getSubsByUserID(id: number){
  //   return this.http.get<Subscription[]>(`${this.baseUrl}api/Subscriptions/userid=${id}`)
  //     .toPromise();
  // }
}
