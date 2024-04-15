import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizonGroupChartComponent } from './horizon-group-chart.component';

describe('HorizonGroupChartComponent', () => {
  let component: HorizonGroupChartComponent;
  let fixture: ComponentFixture<HorizonGroupChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizonGroupChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizonGroupChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
