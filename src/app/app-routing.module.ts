import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "tomos", loadChildren: ()=> import('./tomos/tomos.module').then(m=> m.TomosModule)},
  {path: "**", redirectTo: 'tomos'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
