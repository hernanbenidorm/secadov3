import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../model/empleado';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';


import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  empleado: Empleado[];
  public empleados: Empleado[];
  public status: string;
  errorMesage: string;
  public empleados2: Empleado[];

  constructor(platform: Platform,
    public storage: Storage,
    private _empleadoService: EmpleadoService,
    private alert: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.getEmpleados();
      StatusBar.styleDefault();
    });
  }
  getEmpleados() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });


    loading.present();
  
    this._empleadoService.getEmpleados().subscribe(
      result => {
        
        this.empleados = result.data;
        this.storage.set('ListadeEmpleados', this.empleados);
        this.status = result.status;

       
      
           
 

        //loading.dismiss();

        if (this.status !== 'success') {
          this.errorToast('Error en el servidor');
        }

        // caja_restaurantes.style.display="none";
      },
      error => {

        this.errorMesage = <any>error;

        if (this.errorMesage !== null) {
          console.log(this.errorMesage);


          
            this.errorToast('Error en la peticion');

          
        }
      }
    );
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
}
