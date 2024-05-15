import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../pages/header/header.component';
import { RouterModule } from '@angular/router';
import { ColorService } from '../../color/color.service';
import { TallaService } from '../../talla/talla.service';
import { Talla } from '../../talla/talla';
import { Color } from '../../color/color';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css','../../app.component.css']
})

export class CreateComponentProducto {
  tallas: Talla[] = [];
  colores: Color[] = [];
  selectedFile: File | null = null;
  selectedFileUrl: string | ArrayBuffer | null = null;
  form!: FormGroup;

  constructor(
    public productoService: ProductoService,
    public colorService : ColorService,
    public tallaService : TallaService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nompro: new FormControl('', [Validators.required]),
      idtalla: new FormControl('', [Validators.required]),
      idcolor: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      temporada: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.selectedFileUrl = reader.result;
    };
  }

  submit(){
    console.log(this.form.value);
    
    this.productoService.save(this.form.value).subscribe((res:any) => {
         console.log('Producto created successfully!');
         this.router.navigateByUrl('producto/listado');
    })
  }

}