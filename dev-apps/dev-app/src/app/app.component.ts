import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EthersProvider } from '@ng-web3/ethers';
import { filter, map } from 'rxjs';

import { InfoService } from './info.service';
import { NumberNftService } from './number-nft.service';

@Component({
  selector: 'w3-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly currentAccount$ = this.ethersProvider.state$.pipe(
    map(state => (state.accounts.length ? state.accounts[0] : 'Connect')),
  );

  constructor(
    readonly numberNftService: NumberNftService,
    readonly ethersProvider: EthersProvider,
    readonly infoService: InfoService,
  ) {
    ethersProvider.error$.pipe(filter(Boolean)).subscribe(err => console.log(`Error: ${err?.message}`));
  }

  getBalance(): void {
    this.ethersProvider.getBalance().subscribe(console.log);
  }
}
