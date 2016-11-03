import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EmpleadoService } from '../services/empleado.service';
import { CentrifugasService } from '../services/centrifugas.service';
import { ErrorMessagesService } from '../services/errormessages.service';
import { ListaEmpleados } from '../pages/empleados/lista-empleados/lista-empleados';
import { DetalleEmpleados } from '../pages/empleados/detalle-empleados/detalle-empleados';
import { EditaEmpleado } from '../pages/empleados/edita-empleado/edita-empleado';
import { InsertaEmpleado } from '../pages/empleados/inserta-empleado/inserta-empleado';
import { InsertaMuestra } from '../pages/centrifugas/inserta-muestra/inserta-muestra';
import { ListaMuestras } from '../pages/centrifugas/lista-muestras/lista-muestras';
import {EditaMuestras} from './../pages/centrifugas/edita-muestra/edita-muestra';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListaEmpleados,
    DetalleEmpleados,
    EditaEmpleado,
    InsertaEmpleado,
    InsertaMuestra,
    EditaMuestras,
    ListaMuestras,
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListaEmpleados,
    DetalleEmpleados,
    EditaEmpleado,
    InsertaEmpleado,
    InsertaMuestra,
    EditaMuestras,
    ListaMuestras,
  ],
  providers: [EmpleadoService,
              CentrifugasService,
              ErrorMessagesService,
              Storage
             ]
})
export class AppModule { }
