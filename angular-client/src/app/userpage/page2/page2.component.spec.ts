import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { PageService } from 'src/app/page.service';
import { Page2Component } from './page2.component';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';

describe('Page2Component', () => {
  let component: Page2Component;
  let fixture: ComponentFixture<Page2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page2Component ],
      providers: [PageService,HttpClient,HttpHandler]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
