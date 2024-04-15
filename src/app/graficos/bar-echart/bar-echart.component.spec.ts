import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarEchartComponent } from './bar-echart.component';

describe('BarEchartComponent', () => {
  let component: BarEchartComponent;
  let fixture: ComponentFixture<BarEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
