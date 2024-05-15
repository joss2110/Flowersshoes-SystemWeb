import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ListadoComponent } from './color/listado/listado.component';
import { ListadoComponentTrabajador } from './Trabajador/listado/listado.component'; // Importa el componente de listado de colores
import { ListadorolComponent } from './rol/listadorol/listadorol.component';// Importa el componente de listado de roles
import { CreateComponent } from './color/create/create.component';
import { EditComponent } from './color/edit/edit.component';


export const routes: Routes = [
	{ path: '', redirectTo: 'trabajador/login', pathMatch: 'full'},
	{ path: 'trabajador/login', component: LoginComponent },
	{ path: 'trabajador/listado', component: ListadoComponent },
	{ path: 'trabajador/create', component: CreateComponent },
	{ path: 'trabajador/:trabajadorId/edit', component: EditComponent },
	{ path: 'rol/listado', component: ListadorolComponent },
	{ path: 'rol/create', component: CreateComponent },
	{ path: 'rol/:rolId/edit', component: EditComponent },
  	{ path: 'color/listado', component: ListadoComponent },
	{ path: 'color/create', component: CreateComponent },
	{ path: 'color/:colorId/edit', component: EditComponent }
	
];