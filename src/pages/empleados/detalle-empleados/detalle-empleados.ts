import {Component } from '@angular/core';
import { NavParams, AlertController, NavController} from 'ionic-angular';
import {EmpleadoService}from './../../../services/empleado.service';
import {ListaEmpleados }from './../lista-empleados/lista-empleados';
import {EditaEmpleado}from './../edita-empleado/edita-empleado';



@Component({
  selector:'detalle-empleado',
  templateUrl: 'detalle-empleados.html',
  providers: [EmpleadoService]
})
export class DetalleEmpleados {
  public empleado: any;
  titulo: string = 'Informacion empleados';
  status: string;
  errorMessage: string;



  constructor(private _empleadoService: EmpleadoService, public navController: NavController, navParams: NavParams, public alert: AlertController

  ) {
    this.empleado = navParams.get('empleado');
  }
  deleteEmpleado() {
    this._empleadoService.deleteEmpleado(this.empleado.id).subscribe(
      response => {
        this.status = response.status;
        if (this.status !== 'success') {
          alert('error en el servidor');
        }

      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage !== null) {
          console.log(this.errorMessage);
          alert('error en la peticion');
          alert(this.errorMessage);
        }
      }
    );

    this.navController.push(ListaEmpleados);
  }
  
   pushPage(event, empleado) {
    this.navController.push(EditaEmpleado, {
      empleado: empleado
      
    });
  }


  borrar() {
    let confirm = this.alert.create({
      title: 'Borrar Empleado?',
      message: 'Estas seguro que deseas borrar a este empleado?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.deleteEmpleado();
            console.log('Borrado SI');


          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Borrado NO');

          }
        }
      ]
    });
    confirm.present();
  }



}


