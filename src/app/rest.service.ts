import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map } from 'rxjs/operators';
import { Cliente } from './cliente';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  uri = 'http://localhost:8084' ;
  private headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private repo : HttpClient) { }

  getClientes() :Observable <Cliente[]> {
    /*return this.repo.get(this.uri+'/api/clientes').pipe(
      map(response=>response as Cliente []));*/
      return (this.repo.get<Cliente[]>(this.uri+'/api/clientes'));
  }

  postCliente( c:Cliente):Observable<Cliente> {

    return this.repo.post<Cliente>(this.uri+'/api/postclient', c, {headers:this.headers});
  }

  getCliente (id:number):Observable<Cliente>{
    return this.repo.get<Cliente>(this.uri+'/api/clientes/'+id);
  }

  updateCliente (c:Cliente ):Observable<Cliente>{
    return this.repo.put<Cliente>(
      this.uri+'/api/putClient/'+c.id, c, {headers:this.headers}
    );
  }
  deleteCliente(id: number):Observable<Cliente>{
    return this.repo.delete<Cliente>( `${this.uri}/api/deleteClient/?borrar=${id}`, {headers:this.headers})
  }
}
 
