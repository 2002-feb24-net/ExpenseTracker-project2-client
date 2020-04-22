import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { BillsComponent } from './bills/bills.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LoginComponent } from './login/login.component';

import { UserpageComponent } from './userpage/userpage.component';

import { NotificationsComponent } from './notifications/notifications.component';
import { BudgetsComponent } from './budgets/budgets.component';


const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'Bills', component: BillsComponent },
  { path: 'Subs', component: SubscriptionsComponent },

  { path: 'Page', component: UserpageComponent },


  { path: 'Login', component: LoginComponent },
  { path: 'Notifications', component: NotificationsComponent },
  { path: 'Budgets', component: BudgetsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }