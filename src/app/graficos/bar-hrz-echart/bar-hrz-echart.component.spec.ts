import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarHrzEchartComponent } from './bar-hrz-echart.component';

describe('BarHrzEchartComponent', () => {
  let component: BarHrzEchartComponent;
  let fixture: ComponentFixture<BarHrzEchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarHrzEchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarHrzEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
