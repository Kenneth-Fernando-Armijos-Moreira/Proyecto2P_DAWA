import { TestBed } from '@angular/core/testing';

import { RestaurantesService } from './restaurantes.service';

describe('RestaurantesServicesService', () => {
  let service: RestaurantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
