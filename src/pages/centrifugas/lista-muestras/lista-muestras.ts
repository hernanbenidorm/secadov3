import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { CentrifugasService } from './../../../services/centrifugas.service';
import { Centrifuga } from './../../../model/Centrifuga';
import { ErrorMessagesService } from './../../../services/errormessages.service';
import { EditaMuestras } from './../edita-muestra/edita-muestra';
import { InsertaMuestra } from './../inserta-muestra/inserta-muestra';
//import { Slides } from 'ionic-angular';
//import { ScreenOrientation } from 'ionic-native';
/*
  Generated class for the ListaMuestras page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'lista-muestras',
  templateUrl: 'lista-muestras.html',
  providers: [CentrifugasService,
    ErrorMessagesService
  ]
})
export class ListaMuestras {
  //muestra: string = "hola";
  centrifuga: Centrifuga[];
  status: string;
  errorMessage: string;
  columnas: number;
  cabeceras: any;
  grids: string[];
  titulo: string;
  //opciones de Slides
  /* mySlideOptions = {
     initialSlide: 1,
     loop: true
   };*/
  muestrasCamion: Centrifuga[] = [];
  caudal1A: string = '0';
  caudal2A: string = '0';
  caudal3A: string = '0';
  caudal1B: string = '0';
  caudal2B: string = '0';
  caudal3B: string = '0';
  caudal1C: string = '0';
  caudal2C: string = '0';
  caudal3C: string = '0';
  totalCaudalA: number = 0;
  totalCaudalB: number = 0;
  totalCaudalC: number = 0;
  totalCaudal: number = 0;
  mediaA: number = 0;
  mediaB: number = 0;
  mediaC: number = 0;
  mediaEnt: number = 0;







  constructor(
    public navCtrl: NavController,
    private _centrifugasService: CentrifugasService,
    private _errorMessagesService: ErrorMessagesService
  ) {
    this.titulo = "Muestras de centrifuga";

  }
  mediaMuestras() {
    let a: number = 0;
    let valorA: number = 0;
    let b: number = 0;
    let valorB: number = 0;
    let c: number = 0;
    let valorC: number = 0;
    let contMediaEntrada:number=0;
    let entradas:number=0;
    for (let muestra of this.muestrasCamion) {
      contMediaEntrada++;
      entradas=entradas+parseFloat(muestra.sequedad_entrada);


      if (muestra.letra_centrifuga === "A") {
        console.log("He encontradomuestras de A");
        a++;
        console.log("cont" + a);
        valorA = valorA + parseFloat(muestra.sequedad_salida);
        console.log("suma de las muestras: " + valorA);

      }
      if (muestra.letra_centrifuga === "B") {
        console.log("He encontradomuestras de B");
        b++;
        console.log("cont" + b);
        valorB = valorB + parseFloat(muestra.sequedad_salida);
        console.log("suma de las muestras: " + valorB);

      }
      if (muestra.letra_centrifuga === "C") {
        console.log("He encontradomuestras de C");
        c++;
        console.log("cont" + c);
        valorC = valorC + parseFloat(muestra.sequedad_salida);
        console.log("suma de las muestras: " + valorC);

      }

      this.mediaA = valorA / a;
      console.log("la media de la centrifuga a es: " + this.mediaA);
      this.mediaB = valorB / b;
      console.log("la media de la centrifuga a es: " + this.mediaB);
      this.mediaC = valorC / c;
      console.log("la media de la centrifuga a es: " + this.mediaC);
      this.mediaEnt=entradas/contMediaEntrada;



    }

  }


  suma() {
    let centADif21 = Math.abs(parseInt(this.caudal2A) - parseInt(this.caudal1A));
    let centADif31 = Math.abs(parseInt(this.caudal3A) - parseInt(this.caudal1A));

    let centBDif21 = Math.abs(parseInt(this.caudal2B) - parseInt(this.caudal1B));
    let centBDif31 = Math.abs(parseInt(this.caudal3B) - parseInt(this.caudal1B));

    let centCDif21 = Math.abs(parseInt(this.caudal2C) - parseInt(this.caudal1C));
    let centCDif31 = Math.abs(parseInt(this.caudal3C) - parseInt(this.caudal1C));



    if (this.caudal3A === '0' && this.caudal2A === '0') {
      this.totalCaudalA = 0;
    } else if (this.caudal3A === '0') {
      this.totalCaudalA = centADif21;
      console.log("tercero en 0");
    } else { this.totalCaudalA = centADif31 };

    if (this.caudal3B === '0' && this.caudal2B === '0') {
      this.totalCaudalB = 0;
    } else if (this.caudal3B === '0') {
      this.totalCaudalB = centBDif21;
      console.log("tercero en 0");
    } else { this.totalCaudalB = centBDif31 };

    if (this.caudal3C === '0' && this.caudal2C === '0') {
      this.totalCaudalC = 0;
    } else if (this.caudal3C === '0') {
      this.totalCaudalC = centCDif21;
      console.log("tercero en 0");
    } else { this.totalCaudalC = centCDif31 };




    this.totalCaudal = this.totalCaudalA + this.totalCaudalB + this.totalCaudalC;


    //this.totalCaudalA=parseInt(this.caudal1A)+parseInt(this.caudal2A)+parseInt(this.caudal3A);

    /*this.totalCaudalB=this.caudal1B + this.caudal2B + this.caudal3B;
    this.totalCaudalC=this.caudal1C + this.caudal2C + this.caudal3C;
    this.totalCaudal=this.totalCaudalA + this.totalCaudalB + this.totalCaudalC;*/
  }


  deleteMuestra(idMuestra) {
    this._centrifugasService.deleteMuestra(idMuestra).subscribe(
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

    this.listaMuestras();
  }
  anade(elemento) {
    console.log(elemento);

  }

  share(camion: string, fab: FabContainer, muestra) {


    fab.close();
    console.log("Enviada la muestra a", camion);
    console.log(muestra);

    var i = this.muestrasCamion.push(muestra);
    this.mediaMuestras();

    console.log(i + ' elementos');
  }
  insertaMuestra() {
    this.navCtrl.push(InsertaMuestra);
  }
  editaMuestra(event, muestra) {
    this.navCtrl.push(EditaMuestras, {
      muestra: muestra

    });
  }

  checkImage(letraCentrifuga) {
    console.log
    switch (letraCentrifuga) {
      case 'A':
        return "assets/A.png";

      case 'B':
        return "assets/B.png";

      case 'C':
        return "assets/C.png";

      default:
        return "assets/person.png";

    }
  }



  ionViewDidLoad() {
    this.listaMuestras();

  }

  listaMuestras() {
    this._errorMessagesService.messageLoadingCreate('Espere por favor');

    this._centrifugasService.getMuestras().subscribe(
      result => {
        this.centrifuga = result.data;
        console.log("tamano  " + this.centrifuga.length);
        this.columnas = Centrifuga.length;
        // console.log(this.centrifuga);
        this.status = result.status;
        this._errorMessagesService.messageLoadingDimiss();

        if (this.status !== 'success') {
          this._errorMessagesService.errorToast('Error en el servidor');
        }

        // caja_restaurantes.style.display="none";
      },
      error => {

        this.errorMessage = <any>error;

        if (this.errorMessage !== null) {
          console.log(this.errorMessage);

          this._errorMessagesService.messageLoadingDimiss();
          this._errorMessagesService.errorToast('Error en la peticion');


        }
      }
    );
  }





}
