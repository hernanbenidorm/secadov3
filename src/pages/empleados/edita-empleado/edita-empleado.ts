import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {EmpleadoService} from './../../../services/empleado.service';
import {Empleado}from './../../../model/empleado';
import {ListaEmpleados }from './../lista-empleados/lista-empleados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';






@Component({
  templateUrl: '../inserta-empleado/inserta-empleado.html',
  providers: [EmpleadoService],
  

})

export class EditaEmpleado implements OnInit {
  titulo: string = 'Edita un empleado';
  public empleado: Empleado;
  //empleado = new Empleado(null, 'Hernan', '44803952k', '6666666666', 'cebolla', '22-03-1981', 'hernanbenidorm@gmail.com', '3242342', 'img', '1');
  submitted = false;
  status: string;
  errorMessage: string;
  accion: string = 'Editar Empleado';
  


  myForm: FormGroup;



  constructor(
    public navParams: NavParams,
    private nav: NavController,
    private formBuilder: FormBuilder,
    private _empleadoService: EmpleadoService

  ) {

    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      email: ['', Validators.required],
      num_ss: [],
      imagen: [],
      role: []
    });
  }

  ngOnInit() {
    this.empleado = this.navParams.get('empleado');
   
  }
  saveData() {
    var numEmple: string = String(this.empleado.id);
    this._empleadoService.editaEmpleado(numEmple, this.empleado).subscribe(
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
    this.nav.push(ListaEmpleados);
  }
  
}

