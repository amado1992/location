import { TestBed, inject } from '@angular/core/testing';

import { SecCensalService } from './sec-censal.service';

describe('SecCensalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecCensalService]
    });
  });

  it('should be created', inject([SecCensalService], (service: SecCensalService) => {
    expect(service).toBeTruthy();
  }));
});
