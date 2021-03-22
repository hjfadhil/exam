import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Examtable2Component } from './examtable2.component';

describe('Examtable2Component', () => {
  let component: Examtable2Component;
  let fixture: ComponentFixture<Examtable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Examtable2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Examtable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
