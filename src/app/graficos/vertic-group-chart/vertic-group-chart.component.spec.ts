import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticGroupChartComponent } from './vertic-group-chart.component';

describe('VerticGroupChartComponent', () => {
  let component: VerticGroupChartComponent;
  let fixture: ComponentFixture<VerticGroupChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticGroupChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticGroupChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
