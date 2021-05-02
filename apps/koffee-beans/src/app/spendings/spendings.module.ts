import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingsComponent } from './spendings.component';
import { AddSpendingComponent } from './add-spending/add-spending.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiSharedModule } from '../../../../../libs/tui/src/lib/tui.module';

@NgModule({
  declarations: [SpendingsComponent, AddSpendingComponent],
  imports: [CommonModule, ReactiveFormsModule, TuiSharedModule],
  exports: [SpendingsComponent],
})
export class SpendingsModule {}
