import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController,AlertController, LoadingController, ToastController} from 'ionic-angular';
import {EmpleadoService} from './../../../services/empleado.service';
import {Empleado}from './../../../model/empleado';
import {DetalleEmpleados}from './../detalle-empleados/detalle-empleados';
import {InsertaEmpleado}from './../inserta-empleado/inserta-empleado';



@Component({
  templateUrl: 'lista-empleados.html',
  providers: [EmpleadoService]
})
export class ListaEmpleados implements OnInit {
  titulo: string = 'Lista de los empleados';
  public empleados: Empleado[];
  public empleado: any;
  public status: string;
  errorMesage: string;
  public loading;
  public seguro: boolean;
 

  
  
  
   
  constructor(public storage: Storage,
              private alert:AlertController,
              private toastCtrl: ToastController,
              private _empleadoService: EmpleadoService,
              public navCtrl: NavController,
              private loadingCtrl: LoadingController) {

   
    
  }
 
   

  ngOnInit() {
 
    this.loading = 'show';
    this.getEmpleados();
    console.log('lista-empleados component cargado');

  }
  pushPage(event, empleado) {
    this.navCtrl.push(DetalleEmpleados, {
      empleado: empleado
     
    });
  }
  errorToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }
  getEmpleados() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });


    loading.present();
    this._empleadoService.getEmpleados().subscribe(
      result => {
        this.empleados = result.data;
        this.storage.set('ListadeEmpleados',this.empleados);
       this.status = result.status;

        loading.dismiss();

        if (this.status !== 'success') {
          this.errorToast('Error en el servidor');
        }

        // caja_restaurantes.style.display="none";
      },
      error => {

        this.errorMesage = <any>error;

        if (this.errorMesage !== null) {
          console.log(this.errorMesage);


          loading.dismiss().then(() => {
            this.errorToast('Error en la peticion');

          });
        }
      }
    );
  }
  insertaEmpleado() {
    this.navCtrl.push(InsertaEmpleado);

  }
  deleteEmpleado(id) {
    this._empleadoService.deleteEmpleado(id).subscribe(
      response => {
        this.status = response.status;
        if (this.status !== 'success') {
          alert('error en el servidor');
        }

      },
      error => {
        this.errorMesage = <any>error;
        if (this.errorMesage !== null) {
          console.log(this.errorMesage);
          alert('error en la peticion');
          alert(this.errorMesage);
        }
      }
    );

    this.navCtrl.push(ListaEmpleados);
    
  }
  

  borrar(id) {
    
    let confirm = this.alert.create({
      title: 'Borrar Empleado?',
      message: 'Estas seguro que deseas borrar a este empleado?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.deleteEmpleado(id);
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