import { TestBed } from '@angular/core/testing';

import { ExamtypesService } from './examtypes.service';

describe('ExamtypesService', () => {
  let service: ExamtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
