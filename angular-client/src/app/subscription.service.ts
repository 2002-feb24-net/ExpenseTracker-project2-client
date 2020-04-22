import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Subscription from './models/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private baseUrl = 'https://localhost:44377/';
  constructor(private http: HttpClient) { }
  getSubs() {
    return this.http.get<Subscription[]>(`${this.baseUrl}api/Subscriptions`)
      .toPromise();
  }
  createSubs(sub: Subscription){
    return this.http.post<Subscription>(`${this.baseUrl}api/Subscriptions`, sub)
      .toPromise();
  }
}
