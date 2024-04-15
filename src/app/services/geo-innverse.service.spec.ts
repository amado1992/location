import { TestBed, inject } from '@angular/core/testing';

import { GeoInnverseService } from './geo-innverse.service';

describe('GeoInnverseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoInnverseService]
    });
  });

  it('should be created', inject([GeoInnverseService], (service: GeoInnverseService) => {
    expect(service).toBeTruthy();
  }));
});
