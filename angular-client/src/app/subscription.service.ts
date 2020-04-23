import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Subscription from './models/subscriptions';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private baseUrl = environment.ApiBaseUrl;
  constructor(private http: HttpClient, private LoginService : LoginService) { }
 
  data = this.LoginService.getData();
  
  getSubs() {
    return this.http.get<Subscription[]>(`${this.baseUrl}api/Subscriptions`)
      .toPromise();
  }
  createSubs(sub: Subscription){
    return this.http.post<Subscription>(`${this.baseUrl}api/Subscriptions`, sub)
      .toPromise();
  }
}
