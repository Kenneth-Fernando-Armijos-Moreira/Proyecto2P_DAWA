import { TestBed } from '@angular/core/testing';

import { ActividadesjsonService } from '../ServiciosActividades/actividadesjson.service';

describe('ActividadesjsonService', () => {
  let service: ActividadesjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadesjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
