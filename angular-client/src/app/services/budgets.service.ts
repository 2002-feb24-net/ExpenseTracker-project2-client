import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { SubscriptionService } from '../services/subscription.service'
import Budgets from '../models/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  private baseUrl = environment.ApiBaseUrl;
  constructor(private http: HttpClient,private CookieService: CookieService, private subService: SubscriptionService) { }

  FormData:Budgets;

  getBudgets() {
    return this.http.get<Budgets[]>(`${this.baseUrl}api/Budgets`)
    .toPromise();
  }

  createBudget(budgets:Budgets) {
    return this.http.post<Budgets>(`${this.baseUrl}api/Budgets`, budgets)
    .toPromise();
  }

  getBudgetById() {
    console.log(this.CookieService.get('data'));
    const data= this.CookieService.get('data');
    return this.http.get<Budgets[]>(`${this.baseUrl}api/Budgets/userid=${data}`).toPromise();
  }

  getBudgetByUserId(id: number) {
    return this.http.get<Budgets[]>(`${this.baseUrl}api/Budgets/userid=${id}`).toPromise();
  }
  
}