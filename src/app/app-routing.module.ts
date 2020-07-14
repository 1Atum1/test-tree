import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {SectionComponent} from './section/section.component';
import {PositionComponent} from './position/position.component';

const routes: Routes = [
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'section', component: SectionComponent },
  { path: 'position', component: PositionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
