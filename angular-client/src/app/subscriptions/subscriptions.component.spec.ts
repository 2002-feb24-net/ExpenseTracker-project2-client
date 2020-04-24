import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from '../services/subscription.service';
import Subscriptions from '../models/subscriptions';
import { CookieService } from 'ngx-cookie-service';
import { SubscriptionsComponent } from './subscriptions.component';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';

describe('SubscriptionsComponent', () => {
  let component: SubscriptionsComponent;
  let fixture: ComponentFixture<SubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionsComponent ],
      providers: [SubscriptionService,HttpClient,HttpHandler,FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
