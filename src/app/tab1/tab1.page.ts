import { Component, ViewChild } from '@angular/core';
import * as data from '../../Data/brasil.json'; //aqui es la ruta donde importas el archivo json
import * as data2 from '../../Data/argentina.json'; //aqui es la ruta donde importas el archivo json
import * as data3 from '../../Data/espana.json'; //aqui es la ruta donde importas el archivo json
import * as result from '../../Data/resultados.json'; //aqui es la ruta donde importas el archivo json
import { AlertController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonContent) content: IonContent | undefined;

  public datosArg:any;
  public datosBra:any;
  public datosEsp:any;
  public filtro:string="";
  public handlerMessage = '';

  public datosVistos:any;

  constructor( private alertController: AlertController) {}

  async presentAlert(equipo:any) {
    const alert = await this.alertController.create({
      header: 'Lo vi!',
      subHeader: 'Desea agregar a '+equipo.ShortName+" a su lista de camisetas vistas?",
      message: 'Se va a agregar a tu lista!',
      buttons: [
        {
          text: 'Cancelar, vi mal',
          role: 'false',  
        },
        {
          text: 'Si',
          role: 'true',
        },
      ],
    });

    await alert.present();
    const a= await alert.onDidDismiss()
    console.log(a);
    
    if(a.role == "true")
    {
        this.CargarUno(equipo)
    }
    
  }

  ionViewWillEnter()
  {
    let res = localStorage.getItem("resultados") ?? "";
    this.datosVistos = JSON.parse(res);
    console.log(this.datosVistos);
    

  }

  ngOnInit()
  {
    this.datosBra = data;
    this.datosBra = this.datosBra.ClubData;

    this.datosArg = data2;
    this.datosArg = this.datosArg.ClubData;

    this.datosEsp = data3;
    this.datosEsp = this.datosEsp.ClubData;

    console.log(this.datosBra);
    console.log(this.datosArg);
    console.log(this.datosEsp);
  }

  scroll(el: string) {
    
    let a = document.getElementById(el);
    a?.scrollIntoView();
    
  }

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  CargarUno(equipo:any)
  {
    let posicion = this.datosVistos.findIndex((item:any)=>{
      return item.ID == equipo.ID;
    })
   
    if(posicion == -1)
    {
      this.datosVistos.push({
        "ID": equipo.ID,
        "Name": equipo.Name,
        "ShortName": equipo.ShortName,
        "ImageURL": equipo.ImageURL,
        "Cantidad": 1,
        "FechaUltimo":new Date()
      })
    }
    else
    {
      this.datosVistos[posicion].Cantidad++;
    }
    
    console.log(this.datosVistos);
    localStorage.setItem("resultados",JSON.stringify(this.datosVistos));
  }

}
