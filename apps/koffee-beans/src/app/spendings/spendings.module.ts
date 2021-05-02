import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingsComponent } from './spendings.component';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [SpendingsComponent, AddSpendingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputNumberModule,
    TuiTextAreaModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiButtonModule,
  ],
  exports: [SpendingsComponent],
})
export class SpendingsModule {}
