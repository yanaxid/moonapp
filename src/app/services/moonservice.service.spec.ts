import { TestBed } from '@angular/core/testing';

import { MoonserviceService } from './moonservice.service';

describe('MoonserviceService', () => {
  let service: MoonserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoonserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
