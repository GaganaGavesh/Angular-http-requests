import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';//meka thama http request walata ganne
//whole project ekata http enable karanawa

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth.interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //interceptors dana piliwela wadagath mkoda e dana piliwelata thama run wennne
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true},
    {
    provide: HTTP_INTERCEPTORS, 
    useClass: LoggingInterceptorService, 
    multi: true
    }
  ],//dan angular eken request ekak leave wenakota interceptor method eka run wela e ethod eke tyna 
    //request header yawana wade karanawa
  bootstrap: [AppComponent]
})
export class AppModule { }
