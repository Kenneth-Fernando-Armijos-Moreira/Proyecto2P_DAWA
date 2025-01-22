import { TestBed } from '@angular/core/testing';

import { ExcursionesjsonService } from '../ServiciosExcursiones/excursionesjson.service';

describe('ExcursionesjsonService', () => {
  let service: ExcursionesjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcursionesjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
