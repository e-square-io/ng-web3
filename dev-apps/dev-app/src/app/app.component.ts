import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EthereumProvider } from '@ng-web3/ethers';
import { filter, map } from 'rxjs';

@Component({
  selector: 'w3-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly currentAccount$ = this.ethereumProvider.state$.pipe(
    map(state => (state.accounts.length ? state.accounts[0] : 'Connect')),
  );

  constructor(readonly ethereumProvider: EthereumProvider) {
    ethereumProvider.error$.pipe(filter(Boolean)).subscribe(err => console.log(`Error: ${err?.message}`));
  }

  getBalance(): void {
    this.ethereumProvider.getBalance().subscribe(console.log);
  }
}
