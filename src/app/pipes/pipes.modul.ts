import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './pipes.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DatePipe
  ],
  declarations: [
    DatePipe
  ]
})
export class PipeModule { }