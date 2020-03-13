import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';


import { FormComponent } from './form/form.component';
import {HttpClientModule } from '@angular/common/http';
import {RestService} from './rest.service';
import { ListaclientesComponent } from './listaclientes/listaclientes.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListaclientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
