import { TestBed } from '@angular/core/testing';

import { DashDataService } from './dash-data.service';

describe('DashDataService', () => {
  let service: DashDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
