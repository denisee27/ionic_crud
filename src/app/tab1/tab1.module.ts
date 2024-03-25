import { IonicModule } from '@ionic/angular';
import { NgModule, Pipe } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PipeModule } from '../pipes/pipes.modul';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    PipeModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
