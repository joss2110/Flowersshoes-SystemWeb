
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Talla } from './talla';
  
@Injectable({
  providedIn: 'root'
})
export class TallaService{

  
    private apiURL = "http://localhost:8092/talla/";
    
 
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

    status(idtalla:number){
      const token=localStorage.getItem('token');
      console.log(token);
      const headers=new HttpHeaders({
        'Authorization':`${token}`
      });
      return this.httpClient.delete(this.apiURL + 'status/' + idtalla ,{headers:headers})
    
      .pipe(
        catchError(this.errorHandler)
      )
    }

    save(talla:Talla): Observable<any> {
      const token=localStorage.getItem('token');
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json' 
      });
      return this.httpClient.post(this.apiURL + 'save', JSON.stringify(talla), {headers:headers})
   
      .pipe( 
        catchError(this.errorHandler)
      )
    }

     
    find(idtalla:number): Observable<any> {
      const token=localStorage.getItem('token');
      console.log(token);
      const headers = new HttpHeaders({
        'Authorization': `${token}`,
        'Content-Type': 'application/json' 
      });
      return this.httpClient.get(this.apiURL + 'encontrar/' + idtalla, {headers:headers})
    
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
