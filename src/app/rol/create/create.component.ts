import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolService } from '../rol.service';  // Asegúrate de que la ruta es correcta
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../pages/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css','../../app.component.css']
})
export class CreateComponentRol implements OnInit {

  form!: FormGroup;

  constructor(
    public rolService: RolService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nomrol: new FormControl('', [Validators.required]),
      estado: new FormControl('activo', [Validators.required]),  // Puedes cambiar el estado por defecto si es necesario
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.rolService.save(this.form.value).subscribe((res: any) => {
      console.log('Rol creado exitosamente!');
      this.router.navigateByUrl('rol/listado');
    })
  }
}
