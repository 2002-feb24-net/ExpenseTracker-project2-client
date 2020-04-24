import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillService } from './bill.service';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';

describe('BillService', () => {
  let service: BillService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [BillService,HttpClient,HttpHandler]});
    service = TestBed.inject(BillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
