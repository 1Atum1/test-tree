import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatTreeModule} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {Shared} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule
  ],
  providers: [Shared],
  bootstrap: [AppComponent]
})
export class AppModule { }
