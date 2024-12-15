import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TomosRoutingModule } from './tomos-routing.module';
// import { CrearComponent } from './crear/crear.component';
// import { ListaComponent } from './lista/lista.component';


import { VerComponent } from './ver/ver.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';
import { CrearComponent } from './crear/crear.component';




@NgModule({
  declarations: [
    CrearComponent,
    ListaComponent,
    VerComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TomosRoutingModule,
    ReactiveFormsModule
  ]
})
export class TomosModule { }
