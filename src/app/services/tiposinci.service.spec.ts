import { TestBed } from '@angular/core/testing';

import { TiposinciService } from './tiposinci.service';

describe('TiposinciService', () => {
  let service: TiposinciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposinciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
