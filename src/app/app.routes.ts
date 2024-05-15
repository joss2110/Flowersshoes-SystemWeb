import { Routes } from '@angular/router';
import { ListadoComponentColor } from './color/listado/listado.component';
import { ListadoComponentTalla } from './talla/listado/listado.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponentColor } from './color/create/create.component';
import { EditComponentColor } from './color/edit/edit.component';
import { AuthService } from './auth.service';
import { CreateComponentTalla } from './talla/create/create.component';
import { EditComponentTalla } from './talla/edit/edit.component';
import { ListadoComponentProducto } from './producto/listado/listado.component';
import { CreateComponentProducto } from './producto/create/create.component';
import { EditComponentProducto } from './producto/edit/edit.component';

import { ListadoComponentRol } from './rol/listado/listado.component';
import { CreateComponentRol } from './rol/create/create.component';
import { EditComponentRol } from './rol/edit/edit.component';

import { ListadoComponentTrabajador } from './Trabajador/listado/listado.component';
import { CreateComponentTrabajador } from './Trabajador/create/create.component';
import { EditComponentTrabajador } from './Trabajador/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trabajador/login', pathMatch: 'full'},
  { path: 'trabajador/login', component: LoginComponent},
  { path: 'color/listado', component: ListadoComponentColor, canActivate: [AuthService] },
  { path: 'color/create', component: CreateComponentColor, canActivate: [AuthService] },
  { path: 'color/:colorId/edit', component: EditComponentColor, canActivate: [AuthService] },
  { path: 'talla/listado', component: ListadoComponentTalla, canActivate: [AuthService] },
  { path: 'talla/create', component: CreateComponentTalla, canActivate: [AuthService] },
  { path: 'talla/:tallaId/edit', component: EditComponentTalla, canActivate: [AuthService] },
  { path: 'producto/listado', component: ListadoComponentProducto, canActivate: [AuthService] },
  { path: 'producto/create', component: CreateComponentProducto, canActivate: [AuthService] },
  { path: 'producto/:proId/edit', component: EditComponentProducto, canActivate: [AuthService] },

  { path: 'rol/listado', component: ListadoComponentRol, canActivate: [AuthService] },
  { path: 'rol/create', component: CreateComponentRol, canActivate: [AuthService] },
  { path: 'rol/:rolId/edit', component: EditComponentRol, canActivate: [AuthService] },

  { path: 'trabajador/listado', component: ListadoComponentTrabajador, canActivate: [AuthService] },
  { path: 'trabajador/create', component: CreateComponentTrabajador, canActivate: [AuthService] },
  { path: 'trabajador/:traId/edit', component: EditComponentTrabajador, canActivate: [AuthService] },
];