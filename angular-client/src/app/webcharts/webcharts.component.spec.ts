import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';
import { WebchartsComponent } from './webcharts.component';
import  Bills  from '../models/bills'

describe('WebchartsComponent', () => {
  let component: WebchartsComponent;
  let fixture: ComponentFixture<WebchartsComponent>;
  let bill: Bills[] = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebchartsComponent ],
      providers: [HttpClient,HttpHandler,FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should build strings', () => {
    bill[0] =  {
      userId: 1,
      purchaseName: "name",
      quantity: 2,
      cost: 1,
      billDate: new Date(),
      location: "Here",
    }
    component.bills = bill;
    component.CalculateTotals();
    component.StringBuilder();
    expect(component.tempData).toBeTruthy();
  });
});
