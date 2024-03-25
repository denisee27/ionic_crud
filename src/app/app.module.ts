import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPInterceptorService } from './services/http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe, FilterPipe, HaveKeysPipe, MePipe, NoSpacePipe, NowPipe, NumberPipe, TimePipe, ToSpacePipe } from './pipes/pipes.pipe';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true } // Tambahkan HTTPInterceptor Anda di sini
  ], bootstrap: [AppComponent],
})
export class AppModule { }
