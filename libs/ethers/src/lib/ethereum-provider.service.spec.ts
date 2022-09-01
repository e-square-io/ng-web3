import { TestBed } from '@angular/core/testing';

import { EthereumProvider } from './ethereum-provider.service';

describe('EthereumProviderService', () => {
  let service: EthereumProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthereumProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
