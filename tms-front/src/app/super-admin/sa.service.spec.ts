import { TestBed } from '@angular/core/testing';

import { SaService } from './sa.service';

describe('SaService', () => {
  let service: SaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
