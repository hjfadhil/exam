import { TestBed } from '@angular/core/testing';

import { GexamtableService } from './gexamtable.service';

describe('GexamtableService', () => {
  let service: GexamtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GexamtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
