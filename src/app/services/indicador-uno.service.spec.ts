import { TestBed } from '@angular/core/testing';

import { IndicadorUnoService } from './indicador-uno.service';

describe('IndicadorUnoService', () => {
  let service: IndicadorUnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadorUnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
