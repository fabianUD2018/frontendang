import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaclientesComponent } from './listaclientes/listaclientes.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    component:ListaclientesComponent,
    path:'clientes'
  }
  ,{
    component :FormComponent,
    path:'addCliente'
  },
  {
    component:FormComponent,
    path:'clientes/:id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
