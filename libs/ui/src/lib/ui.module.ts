import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetWorthComponent } from './net-worth/net-worth.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NetWorthComponent
  ],
  exports: [
    NetWorthComponent
  ],
})
export class UiModule {}
