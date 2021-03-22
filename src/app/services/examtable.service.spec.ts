import { TestBed } from '@angular/core/testing';

import { ExamtableService } from './examtable.service';

describe('ExamtableService', () => {
  let service: ExamtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
