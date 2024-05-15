import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TallaService } from '../talla.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from '../../pages/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, RouterModule,HeaderComponent,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css','../../app.component.css']
})
export class CreateComponentTalla {
  form!: FormGroup;

  constructor(
    public tallaService: TallaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      talla: new FormControl('', [Validators.required]),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.tallaService.save(this.form.value).subscribe((res:any) => {
         console.log('Talla created successfully!');
         this.router.navigateByUrl('talla/listado');
    })
  }
}
