import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../pages/header/header.component';
import { Router } from '@angular/router';
import { TrabajadorService } from '../Trabajador.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Rol } from '../../rol/rol';
import { RolService } from '../../rol/rol.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css','../../app.component.css']
})
export class CreateComponentTrabajador {
  form!: FormGroup;

  roles: Rol[] = [];

  constructor(
    public rolService: RolService,
    public trabajadorService: TrabajadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      tipodocumento: new FormControl('', [Validators.required]),
      nrodocumento: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      idrol: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estado: new FormControl('', [Validators.required])
    });

    this.getRoles();
  }

  getRoles(){
    this.rolService.getAll().subscribe(roles => {
      this.roles = roles;
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.trabajadorService.save(this.form.value).subscribe((res: any) => {
      console.log('Trabajador creado exitosamente!');
      this.router.navigateByUrl('trabajador/listado');
    });
  }
}
