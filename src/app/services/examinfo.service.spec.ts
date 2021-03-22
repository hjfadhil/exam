import { TestBed } from '@angular/core/testing';

import { ExaminfoService } from './examinfo.service';

describe('ExaminfoService', () => {
  let service: ExaminfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
