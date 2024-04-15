import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarHrzEchartComponent } from '../bar-hrz-echart/bar-hrz-echart.component';

import { BarHrzEchartCopyComponent } from './bar-hrz-echart-copy.component';

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
