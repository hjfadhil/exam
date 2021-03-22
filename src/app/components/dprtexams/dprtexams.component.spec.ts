import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprtexamsComponent } from './dprtexams.component';

describe('DprtexamsComponent', () => {
  let component: DprtexamsComponent;
  let fixture: ComponentFixture<DprtexamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprtexamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprtexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
