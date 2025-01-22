import { TestBed } from '@angular/core/testing';

import { RestauranteApiService } from './restaurante-api.service';

describe('RestauranteApiService', () => {
  let service: RestauranteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestauranteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
