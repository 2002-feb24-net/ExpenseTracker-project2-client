import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../bill.service';
import { CookieService } from 'ngx-cookie-service';
import Bills from '../models/bills';

import { BillsComponent } from './bills.component';

describe('BillsComponent', () => {
  let component: BillsComponent;
  let fixture: ComponentFixture<BillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsComponent ],
      providers: [BillService,HttpClient,HttpHandler,FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get bills by userid', () => {
    expect(component.getBillsByUserID).toBeTruthy();
  });
  it('should get bills', () => {
    expect(component.getBills).toBeTruthy();
  });
  it('should create bills', () => {
    expect(component.createBills).toBeTruthy();
  });
});
