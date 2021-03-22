import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DprtdtailsComponent } from './dprtdtails.component';

describe('DprtdtailsComponent', () => {
  let component: DprtdtailsComponent;
  let fixture: ComponentFixture<DprtdtailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprtdtailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DprtdtailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
