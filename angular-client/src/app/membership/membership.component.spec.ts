import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import Users from '../models/users';
import { FormBuilder,  Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MembershipComponent } from './membership.component';
import { ProviderAst } from '@angular/compiler';

describe('MembershipComponent', () => {
  let component: MembershipComponent;
  let fixture: ComponentFixture<MembershipComponent>;
  let formBuilder: FormBuilder;
  let toastr: ToastrService;
  let MemberService:UserService;
  provide: formBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(MembershipComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
