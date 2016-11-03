import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { InsertaMuestra } from './../centrifugas/inserta-muestra/inserta-muestra';
import { ListaMuestras } from './../centrifugas/lista-muestras/lista-muestras';
import { ListaEmpleados } from './../empleados/lista-empleados/lista-empleados';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ListaMuestras;
  tab2Root: any = ListaEmpleados;
  tab3Root: any = InsertaMuestra;
  tab4Root: any = HomePage;
  tab5Root: any = AboutPage;



  constructor() {

  }
}
