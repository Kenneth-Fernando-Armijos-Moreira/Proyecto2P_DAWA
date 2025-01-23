import { TestBed } from '@angular/core/testing';

import { ExcursionesApiService } from './excursiones-api.service';

describe('ExcursionesApiService', () => {
  let service: ExcursionesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcursionesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
