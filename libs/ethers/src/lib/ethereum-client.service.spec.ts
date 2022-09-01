import { TestBed } from '@angular/core/testing';

import { EthereumClientService } from './ethereum-client.service';

describe('EthereumClientService', () => {
  let service: EthereumClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthereumClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
