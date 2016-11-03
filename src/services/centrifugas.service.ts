import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Centrifuga } from '../model/centrifuga';
import 'rxjs/Rx';

@Injectable()
export class CentrifugasService{
    //URL:string='http://secadotermicoseasa.xyz/secado/slim/index.php/';
    URL:string='http://localhost:8080/secado/slim/index.php/';



    constructor(private _http: Http) {

    }

    // Listar las muestras
    getMuestras() {
        console.log(this.URL+'getMuestras');

        return this._http.get(this.URL+'getMuestras').map(res => res.json()).catch(this.handleError);
    }


   
    addMuestra(centrifuga: Centrifuga) {
        let json = JSON.stringify(centrifuga);

        let params = 'json=' + json;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.URL+'addMuestra',
            params, { headers: headers }).map(res => res.json()).catch(this.handleError);

    }
    updateMuestra(id: string, centrifuga: Centrifuga) {
        let json = JSON.stringify(centrifuga);

        let params = 'json=' + json;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.URL+'update-muestra/' + id,
            params, { headers: headers }).map(res => res.json()).catch(this.handleError);

    }
    deleteMuestra(id: String) {
        return this._http.get(this.URL+'delete-muestra/' + id).map(res => res.json()).catch(this.handleError);

    }
     private handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}