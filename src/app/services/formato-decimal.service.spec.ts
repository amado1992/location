import { TestBed, inject } from '@angular/core/testing';

import { FormatoDecimalService } from './formato-decimal.service';

describe('FormatoDecimalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatoDecimalService]
    });
  });

  it('should be created', inject([FormatoDecimalService], (service: FormatoDecimalService) => {
    expect(service).toBeTruthy();
  }));
});
