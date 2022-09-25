import { Injectable } from '@angular/core';
import { EthersClient, EthersResponse, RequestInputs } from '@ng-web3/ethers';
import { Observable } from 'rxjs';

import { NUMBERNFT_ADDRESS, NUMBERNFT_ABI } from '../artifacts/ts/5';
import { NumberNft } from '../contract-types';
import { NumberNftToken, PowerState } from './entities';

const MINTING_FEE = 0.01;

@Injectable({
  providedIn: 'root',
})
export class NumberNftService {
  constructor(private readonly ethersClient: EthersClient) {}

  mint(num: number): Observable<EthersResponse<NumberNftToken>> {
    const inputs = new RequestInputs().set('number', num);

    return this.ethersClient.write<NumberNftToken, NumberNft>(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'mint', {
      inputs,
      value: MINTING_FEE,
    });
  }

  getToken(id: number): Observable<NumberNftToken> {
    const inputs = new RequestInputs().set('id', id);

    return this.ethersClient.read<NumberNftToken, NumberNft>(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'getToken', { inputs });
  }

  getPower(): Observable<PowerState> {
    return this.ethersClient.read<PowerState, NumberNft>(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'getPower');
  }

  incPowerNumber(): Observable<EthersResponse<PowerState>> {
    return this.ethersClient.write<PowerState, NumberNft>(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'incPowerNumber');
  }

  setPower(powerState: PowerState): Observable<EthersResponse<PowerState>> {
    const inputs = new RequestInputs().set('number', powerState.powerNumber).set('phrase', powerState.powerPhrase);

    return this.ethersClient.write(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'setPower', { inputs });
  }

  alwaysFailRequire(): Observable<EthersResponse> {
    return this.ethersClient.write<NumberNft>(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'alwaysFailRequire');
  }

  alwaysFailRevert(): Observable<EthersResponse> {
    return this.ethersClient.write<NumberNft>(NUMBERNFT_ADDRESS, NUMBERNFT_ABI, 'alwaysFailRevert');
  }
}
