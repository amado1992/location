import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizChartComponent } from './horiz-chart.component';

describe('HorizChartComponent', () => {
  let component: HorizChartComponent;
  let fixture: ComponentFixture<HorizChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
