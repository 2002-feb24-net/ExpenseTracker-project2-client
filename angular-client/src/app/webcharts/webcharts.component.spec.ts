import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebchartsComponent } from './webcharts.component';

describe('WebchartsComponent', () => {
  let component: WebchartsComponent;
  let fixture: ComponentFixture<WebchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebchartsComponent ]
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
