import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingsComponent } from './spendings.component';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';

@NgModule({
  declarations: [SpendingsComponent, AddSpendingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiTextAreaModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiButtonModule,
  ],
  exports: [SpendingsComponent],
})
export class SpendingsModule {}
