
import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Centrifuga } from '../../../model/Centrifuga';
import { Storage } from '@ionic/storage';
import { Empleado } from './../../../model/empleado';
import { CentrifugasService } from './../../../services/centrifugas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ListaMuestras} from './../lista-muestras/lista-muestras';

//import {Moment} from 'moment';
//import * as moment from 'moment';
//import {ListaMuestras} from"../lista-muestras/lista-muestras";

/*
  Generated class for the InsertaMuestra page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-inserta-muestra',
  templateUrl: '../inserta-muestra/inserta-muestra.html',
  providers: [CentrifugasService]
})
export class EditaMuestras implements OnInit {
  centrifuga: Centrifuga;
  public muestra: Centrifuga;
  // obtengo los datos de los empleados para mostrarlos en un select de la vista
  empleados: Empleado[];
  status: string;
  errorMessage: string;
  accion: string = 'Modifica Muestra';
  //	<form [formGroup]="myForm" (ngSubmit)="saveData()"> en la vista
  myForm: FormGroup;








  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public storage: Storage,
    private _centrifugasService: CentrifugasService,
    private formBuilder: FormBuilder,
  ) {
    //this.centrifuga = new Centrifuga(null, 1, 'A', new Date().toISOString(), new Date().toISOString(), '48', '3000', '4.18', '48.7', '56.2', '44.5', '1.26', '1.91', '22.50', '2700', 'Bien');
    //this.centrifuga = new Centrifuga(null,1, 'A', new Date().toISOString(), new Date().toISOString(), '48', '3000', '4.18', '48.7', '56.2', '44.5', '1.26', '', '', '2700', 'Bien');
    this.myForm = this.formBuilder.group({
      id_empleado: ['', [Validators.required]],
      letra_centrifuga: ['', [Validators.required]],
      fecha_muestra: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      consigna: [],
      va: [],
      vr: [],
      par: [],
      t_entrada: [],
      t_salida: [],
      vibracion: [],
      sequedad_entrada: ['', [Validators.required]],
      sequedad_salida: ['', [Validators.required]],
      poli: [],
      escurrido: []
    });
  }
  ngOnInit() {
    this.centrifuga = this.navParams.get('muestra');
    this.storage.get('ListadeEmpleados').then((value) => {
      this.empleados = value;
      console.log("nombre: " + JSON.stringify(this.empleados));
    });
    console.log(JSON.stringify(this.centrifuga));

    console.log('lista-empleados component cargado');

  }
  choose(elegido) {
    console.log(elegido);
  }


  ionViewDidLoad() {
     
    console.log('Hello InsertaMuestra Page');
    
  }
 

 
  saveData() {
    var numMuestra: string = String(this.centrifuga.id);
    this._centrifugasService.updateMuestra(numMuestra, this.centrifuga).subscribe(
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
    this.navCtrl.push(ListaMuestras);
  }

}
