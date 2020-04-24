import { TestBed, ComponentFixture } from '@angular/core/testing';

import { UserService } from './user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';
import { UsersComponent } from '../users/users.component';

describe('SubscriptionService', () => {
  let service: UserService;
  let fixture: ComponentFixture<UserService>;
  beforeEach(() => {
    fixture = TestBed.createComponent(UserService);
    service = fixture.componentInstance;
    TestBed.configureTestingModule({
        
      providers: [UserService,HttpClient,HttpHandler,FormBuilder]});
    service = TestBed.inject(UserService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should create subs', () => {
    expect(service.CreateUser).toBeTruthy();
  });
  it('should get user subs by id', () => {
    service.getUsersUpdateById(1);
    expect(service.getUsers).toBeTruthy();
  });
});
