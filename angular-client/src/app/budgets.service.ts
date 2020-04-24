import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Budgets from './models/budgets';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {
  private baseUrl = environment.ApiBaseUrl;

  

  constructor(private http: HttpClient) { }

  getBudgets() {
    return this.http.get<Budgets[]>(`${this.baseUrl}api/`)
    .toPromise();
  }

  createBudgets(budgets: Budgets) {
    return this.http.post<Budgets>(`${this.baseUrl}api/Budgets`, budgets)
    .toPromise();
  }
}
