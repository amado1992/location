import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticViviendChartComponent } from './vertic-viviend-chart.component';

describe('VerticViviendChartComponent', () => {
  let component: VerticViviendChartComponent;
  let fixture: ComponentFixture<VerticViviendChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticViviendChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticViviendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
