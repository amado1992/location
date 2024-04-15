import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicservEstimadorComponent } from './micserv-estimador.component';

describe('MicservEstimadorComponent', () => {
  let component: MicservEstimadorComponent;
  let fixture: ComponentFixture<MicservEstimadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicservEstimadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicservEstimadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
