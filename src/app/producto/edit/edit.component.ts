import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorService } from '../../color/color.service';
import { TallaService } from '../../talla/talla.service';
import { Talla } from '../../talla/talla';
import { Color } from '../../color/color';


@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css','../../app.component.css']
})

export class EditComponentProducto {
  idpro!: number;
  producto!: Producto;
  form!: FormGroup;
  tallas: Talla[] = [];
  colores: Color[] = [];

  constructor(
    public productoService: ProductoService,
    public colorService : ColorService,
    public tallaService : TallaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idpro = this.route.snapshot.params['proId'];
    this.productoService.find(this.idpro).subscribe((data: Producto)=>{
      this.producto = data;
      this.form.patchValue({
        idpro: this.producto.idpro,
        nompro: this.producto.nompro,
        idtalla: this.producto.talla.idtalla,
        idcolor: this.producto.color.idcolor,
        categoria: this.producto.categoria,
        temporada: this.producto.temporada,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio
    });
    }); 

    this.form = new FormGroup({
      idpro: new FormControl('', [Validators.required]),
      nompro: new FormControl('', Validators.required),
      idtalla: new FormControl('', Validators.required),
      idcolor: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      temporada: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required)
    });

    this.getColores();
    this.getTallas();
  }
  getColores(){
    this.colorService.getAll().subscribe(colores => {
      this.colores = colores;
    });
  }
  getTallas(){
    this.tallaService.getAll().subscribe(tallas => {
      this.tallas = tallas;
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.productoService.save(this.form.value).subscribe((res:any) => {
         console.log('Producto updated successfully!');
         this.router.navigateByUrl('producto/listado');
    })
  }
}
