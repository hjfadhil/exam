import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicyearsComponent } from './academicyears.component';

describe('AcademicyearsComponent', () => {
  let component: AcademicyearsComponent;
  let fixture: ComponentFixture<AcademicyearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicyearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicyearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
