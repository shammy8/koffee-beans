import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetWorthComponent } from './net-worth/net-worth.component';
import {
  TuiAxesModule,
  TuiBarChartModule,
  TuiBarModule,
  TuiLegendItemModule,
  TuiLineChartModule,
  TuiLineDaysChartModule,
} from '@taiga-ui/addon-charts';

@NgModule({
  imports: [
    // TODO check if I need all these
    CommonModule,
    TuiBarModule,
    TuiBarChartModule,
    TuiAxesModule,
    TuiLineChartModule,
    TuiLineDaysChartModule,
    TuiLegendItemModule,
  ],
  declarations: [NetWorthComponent],
  exports: [NetWorthComponent],
})
export class UiModule {}
