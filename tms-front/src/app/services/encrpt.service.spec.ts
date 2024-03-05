import { TestBed } from '@angular/core/testing';

import { EncrptService } from './encrpt.service';

describe('EncrptService', () => {
  let service: EncrptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncrptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
