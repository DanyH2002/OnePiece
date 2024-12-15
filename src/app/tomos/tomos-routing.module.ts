import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ListaComponent } from './lista/lista.component';
import { CrearComponent } from './crear/crear.component';
import { VerComponent } from './ver/ver.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: ListaComponent },
      { path: 'crear', component: CrearComponent },
      { path: 'ver/:id', component: VerComponent },
      { path: 'actualizar/:id', component: CrearComponent },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomosRoutingModule {}
