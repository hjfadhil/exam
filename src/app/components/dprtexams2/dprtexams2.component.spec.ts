import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dprtexams2Component } from './dprtexams2.component';

describe('Dprtexams2Component', () => {
  let component: Dprtexams2Component;
  let fixture: ComponentFixture<Dprtexams2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dprtexams2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dprtexams2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
