import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrizntViviend2ChartComponent } from './hriznt-viviend2-chart.component';

describe('HrizntViviend2ChartComponent', () => {
  let component: HrizntViviend2ChartComponent;
  let fixture: ComponentFixture<HrizntViviend2ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrizntViviend2ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrizntViviend2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
