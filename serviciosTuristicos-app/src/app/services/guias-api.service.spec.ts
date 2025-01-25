import { TestBed } from '@angular/core/testing';

import { GuiasApiService } from './guias-api.service';

describe('GuiasApiService', () => {
  let service: GuiasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuiasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
