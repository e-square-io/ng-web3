import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';

import { INITIAL_POWER_NUMBER, INITIAL_POWER_PHRASE, PowerState } from '../entities';
import { NumberNftService } from '../number-nft.service';

interface PowerViewModel {
  powerState?: PowerState;
}

type PowerStateForm = Record<keyof PowerState, FormControl>;

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule],
  selector: 'w3-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerComponent {
  private vm: PowerViewModel = {};
  readonly vm$ = new BehaviorSubject<PowerViewModel>(this.vm);
  readonly form = this.fb.nonNullable.group<PowerStateForm>({
    powerNumber: this.fb.nonNullable.control<number>(INITIAL_POWER_NUMBER, [Validators.required]),
    powerPhrase: this.fb.nonNullable.control<string>(INITIAL_POWER_PHRASE, [Validators.required]),
  });

  constructor(private readonly fb: FormBuilder, readonly numberNftService: NumberNftService) {}

  getCurrentPowerState(): void {
    this.numberNftService.getPower().subscribe(powerState => this.updateVm({ powerState }));
  }

  incPowerNumber(): void {
    this.numberNftService
      .incPowerNumber()
      .pipe(
        tap(res => {
          if (res.transactionReceipt) {
            this.updateVm({ powerState: res.result?.[0] });
          }
        }),
      )
      .subscribe();
  }

  updatePowerState(): void {
    if (!this.form.valid) {
      return;
    }

    const newPowerState: PowerState = { ...this.form.getRawValue() };
    this.numberNftService
      .setPower(newPowerState)
      .pipe(
        tap(res => {
          if (res.transactionReceipt) {
            this.updateVm({ powerState: res.result?.[0] });
          }
        }),
      )
      .subscribe();
  }

  private updateVm(model: Partial<PowerViewModel>): void {
    this.vm = { ...this.vm, ...model };
    this.vm$.next(this.vm);
  }
}
