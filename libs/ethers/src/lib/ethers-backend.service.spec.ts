import { TestBed } from '@angular/core/testing';

import { EthersBackendService } from './ethers-backend.service';

describe('EthersBackendService', () => {
  let service: EthersBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
