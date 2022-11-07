import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface FormData {
  hash: FormControl<string | null>;
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'w3-hash-input',
  templateUrl: './hash-input.component.html',
  styleUrls: ['./hash-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HashInputComponent {
  @Output() private readonly valueChange = new EventEmitter<string>();

  readonly form = new FormGroup<FormData>({
    hash: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  submit(): void {
    if (!this.form.valid || !this.form.value.hash) {
      return;
    }

    this.valueChange.emit(this.form.value.hash);
  }
}
