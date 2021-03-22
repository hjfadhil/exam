import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminfoComponent } from './examinfo.component';

describe('ExaminfoComponent', () => {
  let component: ExaminfoComponent;
  let fixture: ComponentFixture<ExaminfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
