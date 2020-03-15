import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {Cliente } from '../cliente';
import {Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private errores :string [];

  constructor(private rest:RestService,
    private route:Router,
    private aRoute:ActivatedRoute) { }

  ngOnInit() {
    
    this.cargarCliente();
  }

  cargarCliente():void{
    
    this.aRoute.params.subscribe(
      params=>{
        let id = params['id'];
        if (id ){

          this.rest.getCliente(id).subscribe(
             cliente => this.cliente=cliente
          );
        }
      }
    )
  }

  postClient ():void {

    
    this.cliente.createdAt= '20201103';
    
    this.rest.postCliente(this.cliente).subscribe(
      res=>{
          this.route.navigate(['clientes']);
          swal('Cliente creado', 'el cliente se a creado con exito', 'success');

      },
      reject =>{//errores
        swal('Rechazado', 'No se pudo crear el usuraio', 'error')
        this.errores=reject.error.errors as string[];
        console.log (reject.error.errors as string[]);
        console.log(reject.status);
      }
    )
    
    
  }

  
  updateCliente ():void {
    
    this.rest.updateCliente(this.cliente).subscribe(
      res=>{
          this.route.navigate(['clientes']);
          swal('Cliente Actualizado', 'el cliente se a creado con exito', 'success');

      },
      reject =>{
        swal('Rechazado', 'No se pudo actualizar el usuraio', 'error')
      }
    )
    
    
  }
  

}
