import { Injectable } from '@angular/core';
import { ErrorResponse } from '@ng-web3/ethers';
import { Observable, Subject, take, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private readonly infoStream$ = new Subject<string | null>();
  private readonly errorStream$ = new Subject<string | null>();

  readonly info$ = this.infoStream$.asObservable();
  readonly error$ = this.errorStream$.asObservable();

  update(message: string | null, timeout = 0): void {
    this.infoStream$.next(message);

    if (timeout) {
      this.timeout(timeout).subscribe(() => this.infoStream$.next(null));
    }
  }

  error(error: ErrorResponse | null, timeout = 2000): void {
    this.infoStream$.next(null);
    this.errorStream$.next(error ? error.reason : null);

    if (error && timeout) {
      this.timeout(timeout).subscribe(() => this.errorStream$.next(null));
    }
  }

  private timeout(time: number): Observable<number> {
    return timer(time, time).pipe(take(1));
  }
}
