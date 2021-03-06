import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Subscription from '../models/subscriptions';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  formData:Subscription;
  private baseUrl = environment.ApiBaseUrl;
  constructor(private http: HttpClient,private CookieService: CookieService) { }
 
  
  getSubsByID() {
    const data=this.CookieService.get('data');
    return this.http.get<Subscription[]>(`${this.baseUrl}api/Subscriptions/userid=${data}`).toPromise();
      
  }
  createSubs(sub: Subscription){
    return this.http.post<Subscription>(`${this.baseUrl}api/Subscriptions`, sub)
      .toPromise();
  }
  getSubsByUserID(id: number){
     return this.http.get<Subscription[]>(`${this.baseUrl}api/Subscriptions/userid=${id}`)
       .toPromise();
  }
  deleteSubById(id: number) {
    return this.http.delete<Subscription>(`${this.baseUrl}api/Subscriptions/`+ id);
  }
}