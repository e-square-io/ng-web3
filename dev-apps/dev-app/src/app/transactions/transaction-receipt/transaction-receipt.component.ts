import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EthersProvider, getTransactionResult } from '@ng-web3/ethers';
import { map, Subject, switchMap } from 'rxjs';

import { NUMBERNFT_ABI } from '../../../artifacts/ts/5';

@Component({
  selector: 'w3-transaction-receipt',
  templateUrl: './transaction-receipt.component.html',
  styleUrls: ['./transaction-receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionReceiptComponent {
  readonly transactionRequest$ = new Subject<string>();
  readonly transactionResponse$ = this.transactionRequest$.pipe(
    switchMap(hash => this.ethersProvider.getTransactionReceipt(hash)),
    map(reciept => (reciept ? { reciept, result: getTransactionResult(reciept, NUMBERNFT_ABI) } : null)),
  );

  constructor(private readonly ethersProvider: EthersProvider) {}
}
