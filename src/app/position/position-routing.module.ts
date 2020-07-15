import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PositionComponent} from "./position.component";

const routes: Routes = [
  { path: '', component: PositionComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PositionRoutingModule {}
