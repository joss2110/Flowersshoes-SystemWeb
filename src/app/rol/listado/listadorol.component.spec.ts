import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComponentRol } from './listado.component';

describe('ListadorolComponent', () => {
  let component: ListadoComponentRol;
  let fixture: ComponentFixture<ListadoComponentRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoComponentRol]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoComponentRol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
