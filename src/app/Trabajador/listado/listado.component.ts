import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../Trabajador.service';
import { Trabajador } from '../Trabajador';
import { HeaderComponent } from '../../pages/header/header.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css','../../app.component.css']
})
export class ListadoComponentTrabajador implements OnInit{

  trabajadores: Trabajador[] = [];

  constructor(public trabajadorService: TrabajadorService, private router: Router) { }

  ngOnInit(): void {
    this.loadTrabajadores();
  }

  loadTrabajadores() {
    this.trabajadorService.getAll().subscribe(
      (data: Trabajador[]) => {
        this.trabajadores = data;
        console.log(this.trabajadores);
      },
      (error) => {
        console.error('Error al cargar los trabajadores:', error);
      }
    );
  }

  deleteTrabajador(idtrabajador: number) {
    this.trabajadorService.status(idtrabajador).subscribe(res => {
      this.loadTrabajadores();
      console.log('Trabajador eliminado correctamente');
    });
  }
}
