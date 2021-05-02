import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiDataListWrapperModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';

const tuiModules = [
  TuiInputNumberModule,
  TuiTextAreaModule,
  TuiInputModule,
  TuiInputDateModule,
  TuiButtonModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
];

@NgModule({
  imports: [CommonModule, ...tuiModules],
  exports: tuiModules,
})
export class TuiSharedModule {}
