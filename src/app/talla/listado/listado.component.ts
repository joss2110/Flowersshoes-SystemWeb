import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TallaService } from '../talla.service';
import { Talla } from '../talla';
import { HeaderComponent } from '../../pages/header/header.component';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css','../../app.component.css']
})
export class ListadoComponentTalla {

  tallas: Talla[] = [];
    
  
  constructor(public tallaService: TallaService, private router: Router) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.tallaService.getAll().subscribe((data: Talla[])=>{
      this.tallas = data;
    })  
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  deleteTalla(idtalla:number){
    this.tallaService.status(idtalla).subscribe(res => {
      this.loadData();
      console.log('talla Eliminada Correctamente');
    })
  }

  loadData() {
    this.tallaService.getAll().subscribe(
      (data) => {
        this.tallas = data;
      },
      (error) => {
        console.error('Error al cargar las tallas:', error);
      }
    );
  }

}
