import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NumberNftComponent } from './number-nft.component';

const routes: Routes = [{ path: '', component: NumberNftComponent }];

@NgModule({
  declarations: [NumberNftComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class NumberNftModule {}
