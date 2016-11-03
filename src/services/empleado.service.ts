import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Empleado } from '../model/empleado';
import 'rxjs/Rx';

@Injectable()
export class EmpleadoService {
   // URL:string='http://secadotermicoseasa.xyz/secado/slim/index.php/';
    URL:string='http://localhost:8080/secado/slim/index.php/';



    constructor(private _http: Http) {

    }

    // Listar los empleados
    getEmpleados() {
        console.log(this.URL+'empleados');

        return this._http.get(this.URL+'empleados').map(res => res.json()).catch(this.handleError);
    }


   
    addEmpleado(empleado: Empleado) {
        let json = JSON.stringify(empleado);

        let params = 'json=' + json;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.URL+'addEmpleado',
            params, { headers: headers }).map(res => res.json()).catch(this.handleError);

    }
    editaEmpleado(id: string, empleado: Empleado) {
        let json = JSON.stringify(empleado);

        let params = 'json=' + json;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.URL+'update-empleado/' + id,
            params, { headers: headers }).map(res => res.json()).catch(this.handleError);

    }
    deleteEmpleado(id: String) {
        return this._http.get(this.URL+'delete-empleado/' + id).map(res => res.json()).catch(this.handleError);

    }
     private handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}