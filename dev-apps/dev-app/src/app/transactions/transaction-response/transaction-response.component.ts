import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EthersProvider } from '@ng-web3/ethers';
import { Subject, switchMap } from 'rxjs';

import { HashInputComponent } from '../hash-input/hash-input.component';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, HashInputComponent],
  selector: 'w3-transaction-response',
  templateUrl: './transaction-response.component.html',
  styleUrls: ['./transaction-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionResponseComponent {
  readonly transactionRequest$ = new Subject<string>();
  readonly transactionResponse$ = this.transactionRequest$.pipe(
    switchMap(hash => this.ethersProvider.getTransaction(hash)),
  );

  constructor(private readonly ethersProvider: EthersProvider) {}
}
