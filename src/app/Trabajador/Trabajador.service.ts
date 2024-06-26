import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from './Trabajador';
import { Trabajador } from './Trabajador';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService{

    private apiURL = "http://localhost:8092/trabajador/";
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
     
    constructor(private httpClient: HttpClient) { }
    
    getAll(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `${token}`
      });
      return this.httpClient.get(this.apiURL + 'listado', { headers: headers })
        .pipe(
          catchError(this.errorHandler)
        );
    }
  
    status(idtrabajador: number): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `${token}`
      });
      return this.httpClient.delete(this.apiURL + 'status/' + idtrabajador, { headers: headers })
        .pipe(
          catchError(this.errorHandler)
        );
    }
  
    save(trabajador: Trabajador): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      });
      return this.httpClient.post(this.apiURL + 'save', JSON.stringify(trabajador), { headers: headers })
        .pipe(
          catchError(this.errorHandler)
        );
    }
  
    find(idtrabajador: number): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      });
      return this.httpClient.get(this.apiURL + 'encontrar/' + idtrabajador, { headers: headers })
        .pipe(
          catchError(this.errorHandler)
        );
    }  
    
    login(trabajador:Trabajador): Observable<LoginResponse> {
      const body = { email: trabajador.email, password: trabajador.password };
      localStorage.setItem('token','')
      return this.httpClient.post<LoginResponse>(this.apiURL + 'login', JSON.stringify(body), this.httpOptions).pipe(
          catchError(this.errorHandler)
      );
    }
      
    errorHandler(error:any) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
   }
   
}