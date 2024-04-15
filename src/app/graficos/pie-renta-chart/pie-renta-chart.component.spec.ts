import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieRentaChartComponent } from './pie-renta-chart.component';

describe('PieRentaChartComponent', () => {
  let component: PieRentaChartComponent;
  let fixture: ComponentFixture<PieRentaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieRentaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieRentaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
