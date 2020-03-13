import { Component, OnInit } from '@angular/core';
import {Cliente } from '../cliente';
import {RestService} from '../rest.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-listaclientes',
  templateUrl: './listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css']
})
export class ListaclientesComponent implements OnInit {
  clientes :Cliente [];
  constructor(private restService : RestService ) { }

  ngOnInit() {
    this.restService.getClientes().subscribe(
      response =>{this.clientes=response}
    )
  }
  deleteCliente (id:number):void {
    
    this.restService.deleteCliente(id).subscribe(
      res=>{
         
          swal('Eliminao', 'el cliente se a eliminao con exito', 'success');
          this.clientes=[];
          this.restService.getClientes().subscribe(
            response =>{this.clientes=response}
          )
      },
      reject =>{
        swal('Rechazado', 'No se pudo eliminar el usuraio', 'error')
      }
    )
    
    
  }

}
