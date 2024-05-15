import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiURL = "http://localhost:8092/rol/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  /**
   * Obtener todos los roles
   *
   * @return response()
   */
  getAll(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.httpClient.get(this.apiURL + 'listado', { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Cambiar el estado de un rol
   *
   * @return response()
   */
  status(idrol: number): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    return this.httpClient.delete(this.apiURL + 'status/' + idrol, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Guardar un nuevo rol
   *
   * @return response()
   */
  save(rol: Rol): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(this.apiURL + 'save', JSON.stringify(rol), { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Obtener un rol por id
   *
   * @return response()
   */
  find(idrol: number): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(this.apiURL + 'encontrar/' + idrol, { headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

  /**
   * Manejar errores
   *
   * @param error
   * @return throwError
   */
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
