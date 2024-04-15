import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizChartPorcComponent } from './horiz-chart-porc.component';

describe('HorizChartPorcComponent', () => {
  let component: HorizChartPorcComponent;
  let fixture: ComponentFixture<HorizChartPorcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizChartPorcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizChartPorcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
