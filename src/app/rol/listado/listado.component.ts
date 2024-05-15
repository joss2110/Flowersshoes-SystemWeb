import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolService } from '../rol.service';  // Asegúrate de que la ruta es correcta
import { Rol } from '../rol';  // Asegúrate de que la ruta es correcta
import { HeaderComponent } from '../../pages/header/header.component';

@Component({
  selector: 'app-listadorol',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './listado.component.html',
  styleUrls: ['./listadorol.component.css','../../app.component.css']
})
export class ListadoComponentRol {

  roles: Rol[] = [];

  constructor(public rolService: RolService, private router: Router) { }

  ngOnInit(): void {
    this.rolService.getAll().subscribe((data: Rol[]) => {
      this.roles = data;
      console.log(this.roles);
    });
  }

  deleteRol(idrol: number) {
    this.rolService.status(idrol).subscribe(res => {
      this.loadData();
      console.log('Rol Eliminado Correctamente');
    });
  }

  loadData() {
    this.rolService.getAll().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }
}
