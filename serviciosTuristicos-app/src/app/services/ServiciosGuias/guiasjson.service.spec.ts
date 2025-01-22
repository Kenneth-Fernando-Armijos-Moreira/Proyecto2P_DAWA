import { TestBed } from '@angular/core/testing';

import { GuiasjsonService } from '../ServiciosGuias/guiasjson.service';

describe('GuiasjsonService', () => {
  let service: GuiasjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuiasjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
