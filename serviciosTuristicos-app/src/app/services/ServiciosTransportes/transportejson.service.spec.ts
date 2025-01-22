import { TestBed } from '@angular/core/testing';

import { TransportejsonService } from '../ServiciosTransportes/transportejson.service';

describe('TransportejsonService', () => {
  let service: TransportejsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportejsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
