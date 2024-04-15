import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenExplorerComponent } from './open-explorer.component';

describe('SaveProjectComponent', () => {
  let component: OpenExplorerComponent;
  let fixture: ComponentFixture<OpenExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
