import {Component, OnInit} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {EmpleadoService} from './../../../services/empleado.service';
import {Empleado}from './../../../model/empleado';
import {ListaEmpleados }from './../lista-empleados/lista-empleados';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
//import {Camera} from 'ionic-native';






@Component({
  templateUrl: 'inserta-empleado.html',
  providers: [EmpleadoService]
 

})

export class InsertaEmpleado implements OnInit {
  titulo: string = 'Inserta un Empleado';
  public empleado: Empleado;
  public filesToUpload: Array<File>;
  //public srcImage: string;

  status: string;
  errorMessage: string;
  accion: string = 'Nuevo Empleado';


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
      role: []


    });
  }
  /*getPicture(sourceType: number) {


    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
   
    Camera.getPicture({
        destinationType: Camera.DestinationType.FILE_URI,
        quality: 50,
        
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.empleado.imagen =  imageData;
    }, (err) => {
        console.log(err);
    });
  }
*/
  
  ngOnInit() {
    //this.empleado = this.navParams.get('empleado');
    this.empleado = new Empleado(null, 'Hernan', '44803952k', '6666666666', 'cebolla', '22-03-1981', 'hernanbenidorm@gmail.com', '3242342', '', '1');

  }


  saveData() {

    //console.log(this.empleado);


    this._empleadoService.addEmpleado(this.empleado).subscribe(
      response => {
        this.status = response.status;
        if (this.status !== 'success') {
          alert('error en el servidor');
        }
        this.subeImagen(document.getElementById('imagen'));
        //console.log(this.empleado);


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

  public resultUpload;
  subeImagen(fileInput: any) {

    this.filesToUpload = <Array<File>>fileInput.target.files;

    this.makeFileRequest('http://localhost:8080/www/secado/index.php/upload-file', [], this.filesToUpload).then((result) => {
      this.resultUpload = result;
      this.empleado.imagen = this.resultUpload.filename;

    }, (error) => {
      console.log(error);
    });



  }


  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }


}

