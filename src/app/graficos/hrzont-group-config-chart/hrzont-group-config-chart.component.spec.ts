import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrzontGroupConfigChartComponent } from './hrzont-group-config-chart.component';

describe('HrzontGroupConfigChartComponent', () => {
  let component: HrzontGroupConfigChartComponent;
  let fixture: ComponentFixture<HrzontGroupConfigChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrzontGroupConfigChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrzontGroupConfigChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
