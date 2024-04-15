import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieEchartComponent } from './pie-echart.component';

describe('PieEchartComponent', () => {
  let component: PieEchartComponent;
  let fixture: ComponentFixture<PieEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
