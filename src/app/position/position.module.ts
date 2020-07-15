import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatButtonModule} from '@angular/material';
import {PositionComponent} from "./position.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PositionRoutingModule} from "./position-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PositionRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [PositionComponent]
})
export class PositionModule {}
