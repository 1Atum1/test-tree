import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SectionComponent } from './section/section.component';
import { PositionComponent } from './position/position.component';
import {AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTreeModule} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {ReactiveFormsModule} from '@angular/forms';
import {Shared} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SectionComponent,
    PositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [Shared],
  bootstrap: [AppComponent]
})
export class AppModule { }
