import { TestBed } from '@angular/core/testing';

import { NumberNftService } from './number-nft.service';

describe('NumberNftService', () => {
  let service: NumberNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
