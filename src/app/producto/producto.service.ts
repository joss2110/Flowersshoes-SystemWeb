import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Producto } from './producto';
  
@Injectable({
  providedIn: 'root'
})
export class ProductoService{

  
    private apiURL = "http://localhost:8092/producto/";
    
 
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
     
 
    constructor(private httpClient: HttpClient) { }
      

    getAll(): Observable<any> {
      const token=localStorage.getItem('token');
      console.log(token);
      const headers=new HttpHeaders({
        'Authorization':`${token}`
      });
      return this.httpClient.get(this.apiURL + 'listado',{headers:headers})
      .pipe(
        catchError(this.errorHandler)
      )
    }

    status(idprod:number){
      const token=localStorage.getItem('token');
      console.log(token);
      const headers=new HttpHeaders({
        'Authorization':`${token}`
      });
      return this.httpClient.delete(this.apiURL + 'status/' + idprod ,{headers:headers})
    
      .pipe(
        catchError(this.errorHandler)
      )
    }

    save(producto:Producto): Observable<any> {
      const token=localStorage.getItem('token');
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json' 
      });
      return this.httpClient.post(this.apiURL + 'save', JSON.stringify(producto), {headers:headers})
   
      .pipe( 
        catchError(this.errorHandler)
      )
    }

    find(idprod:number): Observable<any> {
      const token=localStorage.getItem('token');
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json' 
      });
      return this.httpClient.get(this.apiURL + 'encontrar/' + idprod, {headers:headers})
    
      .pipe(
        catchError(this.errorHandler)
      )
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