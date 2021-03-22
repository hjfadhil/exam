import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamtableComponent } from './examtable.component';

describe('ExamtableComponent', () => {
  let component: ExamtableComponent;
  let fixture: ComponentFixture<ExamtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
