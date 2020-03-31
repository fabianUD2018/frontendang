import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { formatDate } from '@angular/common';//TMBIEN SE PUEDE USAR DATEPIPE
import { map, catchError } from 'rxjs/operators';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  uri = 'http://localhost:8084';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private repo: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.repo.get(this.uri + '/api/clientes').pipe(
      map(response => {
        let clientes = response as Cliente[];
        return clientes.map(
          c => {
            c.nombre.toUpperCase();
            c.createdAt = formatDate(c.createdAt, 'yyyy-mm-dd', 'en-US');
            return c;
          }
        );
      }
      )
    );
  /*
return this.repo.get(this.uri+'/api/clientes').pipe(
  map(response=>response as Cliente []));

  
  return (this.repo.get<Cliente[]>(this.uri+'/api/clientes'));*/
}

postCliente(c: Cliente): Observable < Cliente > {

  return this.repo.post<Cliente>(this.uri + '/api/postclient',
    c, { headers: this.headers })
    .pipe(
      catchError
        (e => {
          if (e.status = 400) return throwError(e);
          //swal('Error al obtner', e.error.mensaje, 'error');//
        }
        )
    );
}

getCliente(id: number): Observable < Cliente > {
  return this.repo.get<Cliente>(this.uri + '/api/clientes/' + id)
    .pipe(catchError(e => {
      swal('Error al obtner', e.error.mensaje, 'error');
      return throwError(e);
    }));
}

updateCliente(c: Cliente): Observable < Cliente > {
  return this.repo.put<Cliente>(
    this.uri + '/api/putClient/' + c.id, c, { headers: this.headers }
  );
}
deleteCliente(id: number): Observable < Cliente > {
  return this.repo.delete<Cliente>(`${this.uri}/api/deleteClient/?borrar=${id}`, { headers: this.headers })
}
}

