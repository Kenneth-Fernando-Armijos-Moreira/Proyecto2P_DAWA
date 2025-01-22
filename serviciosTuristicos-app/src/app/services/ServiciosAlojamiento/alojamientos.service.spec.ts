import { TestBed } from '@angular/core/testing';

import { AlojamientosServices } from './alojamientos.service';

describe('AlojamientosService', () => {
  let service: AlojamientosServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlojamientosServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
