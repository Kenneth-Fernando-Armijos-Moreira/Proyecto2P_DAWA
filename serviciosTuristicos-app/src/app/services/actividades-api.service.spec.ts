import { TestBed } from '@angular/core/testing';

import { ActividadesApiService } from './actividades-api.service';

describe('ActividadesApiService', () => {
  let service: ActividadesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
