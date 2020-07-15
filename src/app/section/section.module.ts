import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatButtonModule} from '@angular/material';
import {SectionComponent} from "./section.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {SectionRoutingModule} from "./section-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SectionRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [SectionComponent]
})
export class SectionModule {}
