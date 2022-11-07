import { TestBed } from '@angular/core/testing';

import { EthersProvider } from './ethers-provider.service';

describe('EthereumProviderService', () => {
  let service: EthersProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthersProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
