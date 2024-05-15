import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolService } from '../rol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../rol';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css','../../app.component.css']
})
export class EditComponentRol implements OnInit {

  idrol!: number;
  rol!: Rol ;
  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.idrol = this.route.snapshot.params['rolId'];
    this.rolService.find(this.idrol).subscribe((data: Rol) => {
      this.rol = data;
      this.form.patchValue({
        idrol: this.rol.idrol,
        nomrol: this.rol.nomrol,
      });
    });

    this.form = new FormGroup({
      idrol: new FormControl('', Validators.required),
      nomrol: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.rolService.save(this.form.value).subscribe((res: any) => {
        console.log('Rol actualizado exitosamente!');
        this.router.navigateByUrl('rol/listado');
      }, (error) => {
        console.error('Error al actualizar el rol:', error);
      });
    }
  }
}
