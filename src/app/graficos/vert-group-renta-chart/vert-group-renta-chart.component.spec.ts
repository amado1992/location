import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertGroupRentaChartComponent } from './vert-group-renta-chart.component';

describe('VertGroupRentaChartComponent', () => {
  let component: VertGroupRentaChartComponent;
  let fixture: ComponentFixture<VertGroupRentaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertGroupRentaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertGroupRentaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
