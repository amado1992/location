import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieViviendChartComponent } from './pie-viviend-chart.component';

describe('PieViviendChartComponent', () => {
  let component: PieViviendChartComponent;
  let fixture: ComponentFixture<PieViviendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieViviendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieViviendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
