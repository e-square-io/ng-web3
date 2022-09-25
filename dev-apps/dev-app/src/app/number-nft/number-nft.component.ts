import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { NumberNftService } from '../number-nft.service';

@Component({
  selector: 'w3-number-nft',
  templateUrl: './number-nft.component.html',
  styleUrls: ['./number-nft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberNftComponent {
  readonly getTokenForm = new FormGroup<{ id: FormControl<number> }>({
    id: new FormControl<number>(0, { nonNullable: true }),
  });

  readonly mintForm = new FormGroup<{ num: FormControl<number> }>({
    num: new FormControl<number>(0, { nonNullable: true }),
  });

  constructor(private readonly numberNftService: NumberNftService) {}

  getToken(): void {
    this.numberNftService.getToken(this.getTokenForm.getRawValue().id).subscribe(res => console.log(res));
  }

  mint(): void {
    this.numberNftService.mint(this.mintForm.getRawValue().num).subscribe(res => console.log(res.result || res));
  }

  alwaysFailRequire(): void {
    this.numberNftService.alwaysFailRequire().subscribe(res => console.log(res));
  }

  alwaysFailRevert(): void {
    this.numberNftService.alwaysFailRevert().subscribe(res => console.log(res));
  }
}
