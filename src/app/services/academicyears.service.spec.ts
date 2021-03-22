import { TestBed } from '@angular/core/testing';

import { AcademicyearsService } from './academicyears.service';

describe('AcademicyearsService', () => {
  let service: AcademicyearsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicyearsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
