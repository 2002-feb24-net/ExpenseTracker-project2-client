import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { BillsComponent } from './bills/bills.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'Bills', component: BillsComponent },
  { path: 'Login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }