import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Budgets from './models/budgets';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  BudgetId: number = 2; //TEMP CHANGE THIS
  header: any;
  formData:Budgets;
  list: Budgets;

  constructor(private http: HttpClient,private CookieService: CookieService) { }

  private baseUrl = environment.ApiBaseUrl;

  getBudgets() {
    return this.http.get<Budgets>(`${this.baseUrl}api/Budgets`)
      .toPromise();
  }

  getBudgetsById()
 {
  return this.http.get<Budgets>(`${this.baseUrl}api/Budgets/` + this.formData.Id).toPromise();
 }
 CreateBudgets(Budgets: Budgets){
   return this.http.post<Budgets>(`${this.baseUrl}api/Budgets`, Budgets)
     .toPromise();
 }
 getBudgetssUpdateById()
 {
 const  data=this.CookieService.get('data');
  return this.http.get<Budgets>(`${this.baseUrl}api/Budgets/${data}`)
  .toPromise();
 }
UpdateBudgets(Budgets: Budgets){
  const  data=this.CookieService.get('data');
 return this.http.put<Budgets>(`${this.baseUrl}api/Budgets/${data}`, Budgets)
 .toPromise();
}
 refreshList(){
  this.http.get<Budgets>(`${this.baseUrl}api/Budgets`)
  .toPromise()
  .then(res => this.list = res as Budgets);
}
}