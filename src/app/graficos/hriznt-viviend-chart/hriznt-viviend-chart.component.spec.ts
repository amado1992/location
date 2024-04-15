import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrizntViviendChartComponent } from './hriznt-viviend-chart.component';

describe('HrizntViviendChartComponent', () => {
  let component: HrizntViviendChartComponent;
  let fixture: ComponentFixture<HrizntViviendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrizntViviendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrizntViviendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
