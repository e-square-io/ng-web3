import { Injectable, NgZone } from '@angular/core';
import { providers, utils } from 'ethers';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  EMPTY,
  from,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';

import {
  ConnectInfo,
  createInitialEthereumProviderState,
  EthereumProviderState,
  getNetwork,
  Network,
} from './entities';

declare global {
  interface Window {
    ethereum?: providers.BaseProvider & providers.ExternalProvider & { isConnected: () => boolean };
  }
}

@Injectable({
  providedIn: 'root',
})
export class EthereumProvider {
  private _ethereum = typeof window?.ethereum !== 'undefined' ? window.ethereum : undefined;
  private state = createInitialEthereumProviderState();
  private readonly stateSubject$ = new BehaviorSubject<EthereumProviderState>(this.state);
  private readonly disconnectSubject$ = new Subject<void>();

  readonly disconnect$ = this.disconnectSubject$.asObservable();
  readonly state$ = this.stateSubject$.asObservable();
  readonly ready$ = this.stateSubject$.pipe(
    map(state => state.ready),
    distinctUntilChanged(),
  );
  readonly signedIn$ = this.stateSubject$.pipe(
    map(state => state.accounts.length > 0),
    distinctUntilChanged(),
  );
  readonly connectionButtonDisabled$ = this.stateSubject$.pipe(
    map(state => !state.ready || state.busy),
    distinctUntilChanged(),
  );
  readonly error$ = this.stateSubject$.pipe(
    map(state => state.error),
    distinctUntilChanged(),
  );

  get isEthereumCompatible(): boolean {
    return !!this._ethereum;
  }

  get provider(): providers.Web3Provider | undefined {
    return this._ethereum ? new providers.Web3Provider(this._ethereum) : undefined;
  }

  constructor(ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      this._ethereum?.on('connect', (conn: ConnectInfo) =>
        ngZone.run(() => {
          const currentNetwork = getNetwork(parseInt(conn.chainId));
          this.stateUpdate({ ready: true, currentNetwork });
        }),
      );

      this._ethereum?.on('disconnect', () => {
        ngZone.run(() => {
          this.stateUpdate({ ready: false });
          this.disconnectSubject$.next();
        });
      });

      this._ethereum?.on('accountsChanged', (accounts: string[]) => ngZone.run(() => this.stateUpdate({ accounts })));
      this._ethereum?.on('chainChanged', chainId =>
        ngZone.run(() => {
          const currentNetwork = getNetwork(parseInt(chainId));
          this.stateUpdate({ currentNetwork });
        }),
      );
    });
    timer(500, 1)
      .pipe(
        take(1),
        switchMap(() => (this.state.ready ? EMPTY : combineLatest([this.getAccounts(), this.getNetwork()]))),
      )
      .subscribe();
    this.ready$.pipe(switchMap(() => this.getAccounts())).subscribe();
  }

  connect(): void {
    if (!this._ethereum || !this._ethereum.request) {
      throw new Error('No ethereum provider detected');
    }

    if (this.state.accounts.length) {
      return;
    }

    this.setBusy(true);
    this.requestAccounts()
      .pipe(switchMap(() => this.getNetwork()))
      .subscribe({
        next: () => this.setBusy(false),
        error: error => {
          this.stateUpdate({ error, busy: false });
        },
      });
  }

  requestAccounts(): Observable<string[]> {
    return this._ethereum?.request && this._ethereum.isConnected()
      ? from(this._ethereum.request({ method: 'eth_requestAccounts' })).pipe(
          tap(accounts => this.stateUpdate({ accounts })),
        )
      : EMPTY;
  }

  getAccounts(): Observable<string[]> {
    if (this._ethereum?.isConnected()) {
      this.stateUpdate({ ready: true });
    }

    return this._ethereum?.request && this._ethereum.isConnected()
      ? from(this._ethereum.request({ method: 'eth_accounts' })).pipe(tap(accounts => this.stateUpdate({ accounts })))
      : EMPTY;
  }

  getNetwork(): Observable<Network | undefined> {
    return this._ethereum?.request && this._ethereum.isConnected()
      ? from(this._ethereum.request({ method: 'eth_chainId' })).pipe(
          map(c => getNetwork(parseInt(c))),
          tap(currentNetwork => this.stateUpdate({ currentNetwork })),
        )
      : EMPTY;
  }

  getBalance(address?: string): Observable<number> {
    if (!this.provider || (!address && !this.state.accounts.length)) {
      throw new Error('You must provide account address or sign in to use your current account.');
    }

    return from(this.provider?.getBalance(address || this.state.accounts[0])).pipe(
      map(res => parseFloat(utils.formatEther(res))),
    );
  }

  private stateUpdate(state: Partial<EthereumProviderState>): void {
    this.state = { ...this.state, ...state, error: state.error ? state.error : undefined };
    this.stateSubject$.next(this.state);
  }

  private setBusy(busy: boolean): void {
    this.stateUpdate({ busy });
  }
}
