import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LoginComponent } from './login/login.component';

import { UserpageComponent } from './userpage/userpage.component';
import { Page1Component } from './userpage/page1/page1.component';
import { Page2Component } from './userpage/page2/page2.component';
import { UserService } from './user.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { PageService } from './page.service';


import { NotificationsComponent } from './notifications/notifications.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';
import { SelectBillComponent } from './select-bill/select-bill.component';


@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    UsersComponent,
    NavbarComponent,
    SubscriptionsComponent,
    LoginComponent,

    UserpageComponent,
    Page1Component,
    Page2Component,

    NotificationsComponent,

    PayBillsComponent,

    SelectBillComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
 
  ],
  providers: [UserService, PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
