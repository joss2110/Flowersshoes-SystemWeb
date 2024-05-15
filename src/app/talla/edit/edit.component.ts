import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TallaService } from '../talla.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Talla } from '../talla';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-talla',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css','../../app.component.css']
})
export class EditComponentTalla {

  idtalla!: number;
  talla!: Talla;
  form!: FormGroup;

  constructor(
    public tallaService: TallaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idtalla = this.route.snapshot.params['tallaId'];
    this.tallaService.find(this.idtalla).subscribe((data: Talla)=>{
      this.talla = data;
    }); 

    this.form = new FormGroup({
      idtalla: new FormControl('', [Validators.required]),
      talla: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.tallaService.save(this.form.value).subscribe((res:any) => {
         console.log('talla updated successfully!');
         this.router.navigateByUrl('talla/listado');
    })
  }

}