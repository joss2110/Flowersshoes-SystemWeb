import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { HeaderComponent } from '../../pages/header/header.component';


@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css','../../app.component.css']
})
export class ListadoComponentProducto {
  productos: Producto[] = [];
    
  
  constructor(public productoService: ProductoService, private router: Router) { }
    

  ngOnInit(): void {
    this.productoService.getAll().subscribe((data: Producto[])=>{
      this.productos = data;
    })  
  }

 

  deleteProducto(idprod:number){
    this.productoService.status(idprod).subscribe(res => {
      this.loadData();
      console.log('Producto Eliminado Correctamente');
    })
  }

  loadData() {
    this.productoService.getAll().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

}
