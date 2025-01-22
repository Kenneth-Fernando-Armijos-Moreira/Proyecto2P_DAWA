import { TestBed } from '@angular/core/testing';

import { TransporteApiService } from './transporte-api.service';

describe('TransporteApiService', () => {
  let service: TransporteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransporteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
