import { TestBed } from '@angular/core/testing';

import { EthersClient } from './ethers-client.service';

describe('EthereumClientService', () => {
  let service: EthersClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
