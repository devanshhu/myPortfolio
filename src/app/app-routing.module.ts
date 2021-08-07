import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from "./about/about.component";
import { TechnologiesComponent } from "./technologies/technologies.component";
const routes: Routes = [
  {
    path:'',
    component : AboutComponent
  },
  {
    path : 'projects',
    component : TechnologiesComponent
  },
  {
    path : '**',
    redirectTo : '/'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
