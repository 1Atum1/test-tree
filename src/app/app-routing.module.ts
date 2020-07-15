import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'section', loadChildren: '../app/section/section.module#SectionModule' },
  { path: 'position', loadChildren: '../app/position/position.module#PositionModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
