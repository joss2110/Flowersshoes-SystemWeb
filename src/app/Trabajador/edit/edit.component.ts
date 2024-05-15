import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../Trabajador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Trabajador } from '../Trabajador';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Rol } from '../../rol/rol';
import { RolService } from '../../rol/rol.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css','../../app.component.css']
})
export class EditComponentTrabajador {

  idtra!: number;
  trabajador!: Trabajador;
  form!: FormGroup;

  roles: Rol[] = [];

  constructor(
    public rolService: RolService,
    public trabajadorService: TrabajadorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idtra = this.route.snapshot.params['traId'];
    this.trabajadorService.find(this.idtra).subscribe((data: Trabajador) => {
      this.trabajador = data;
    });

    this.form = new FormGroup({
      idtra: new FormControl('', Validators.required),
      nombres: new FormControl('', [Validators.required]),
      tipodocumento: new FormControl('', Validators.required),
      nrodocumento: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      idrol: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)

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
      console.log('Trabajador updated successfully!');
      this.router.navigateByUrl('trabajador/listado');
    })
  }
}
