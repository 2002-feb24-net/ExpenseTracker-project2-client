import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient, HttpHandler } from '@angular/common/http';
import { WebchartsComponent } from './webcharts.component';

describe('WebchartsComponent', () => {
  let component: WebchartsComponent;
  let fixture: ComponentFixture<WebchartsComponent>;

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
});
