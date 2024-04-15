import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHrzontGroupNotporcChartComponent } from './app-hrzont-group-notporc-chart.component';

describe('AppHrzontGroupNotporcChartComponent', () => {
  let component: AppHrzontGroupNotporcChartComponent;
  let fixture: ComponentFixture<AppHrzontGroupNotporcChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHrzontGroupNotporcChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHrzontGroupNotporcChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
