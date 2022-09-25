import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PowerComponent } from './power.component';

const routes: Routes = [{ path: '', component: PowerComponent }];

@NgModule({
  declarations: [PowerComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class PowerModule {}
