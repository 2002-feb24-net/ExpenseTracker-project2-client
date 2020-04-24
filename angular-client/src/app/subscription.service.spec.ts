import { TestBed } from '@angular/core/testing';

import { SubscriptionService } from './services/subscription.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionService,HttpClient,HttpHandler,FormBuilder]});
    service = TestBed.inject(SubscriptionService);

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create subs', () => {
    expect(service.createSubs).toBeTruthy();
  });
  it('should get user subs by id', () => {
    expect(service.getSubsByUserID).toBeTruthy();
  });
});
