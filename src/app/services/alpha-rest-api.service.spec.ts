import { TestBed } from '@angular/core/testing';
import { AlphaRestApiService } from './alpha-rest-api.service';

describe('AlphaRestApiService', () => {
  let service: AlphaRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlphaRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
