import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class ErrorMessagesService {
    public loading;



    constructor(private _toast: ToastController,
        private _alert: AlertController,
        private _loading: LoadingController
    ) {

    }

    errorToast(mensaje: string) {
        let toast = this._toast.create({
            message: mensaje,
            duration: 3000,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();

    }

    messageLoadingCreate(mensaje) {
        this.loading = this._loading.create({
            content: mensaje
        });
        this.loading.present();

    }
    messageLoadingDimiss() {
        this.loading.dismiss();


    }





}