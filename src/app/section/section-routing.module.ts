import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SectionComponent} from "./section.component";

const routes: Routes = [
  { path: '', component: SectionComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class SectionRoutingModule {}
