import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

const tuiModules = [
  TuiInputNumberModule,
  TuiTextAreaModule,
  TuiInputModule,
  TuiInputDateModule,
  TuiButtonModule,
];

@NgModule({
  imports: [CommonModule, ...tuiModules],
  exports: tuiModules,
})
export class TuiSharedModule {}
