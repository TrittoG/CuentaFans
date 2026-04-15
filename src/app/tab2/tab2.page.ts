import { Component } from '@angular/core';
import * as intl from '../../Data/internacional.json';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public datosIntl: any;
  public datosVistos: any;
  public filtro: string = "";

  constructor(private alertController: AlertController) {}

  ionViewWillEnter() {
    const res = localStorage.getItem("resultados");
    this.datosVistos = res ? JSON.parse(res) : [];
  }

  ngOnInit() {
    this.datosIntl = intl;
    this.datosIntl = this.datosIntl.InternationalData;
  }

  async presentAlert(equipo: any) {
    const alert = await this.alertController.create({
      header: 'Lo vi!',
      subHeader: 'Desea agregar a ' + equipo.ShortName + ' a su lista de camisetas vistas?',
      message: 'Se va a agregar a tu lista!',
      buttons: [
        { text: 'Cancelar, vi mal', role: 'false' },
        { text: 'Si', role: 'true' },
      ],
    });

    await alert.present();
    const a = await alert.onDidDismiss();

    if (a.role === 'true') {
      this.cargarUno(equipo);
    }
  }

  cargarUno(equipo: any) {
    const posicion = this.datosVistos.findIndex((item: any) => item.ID == equipo.ID);

    if (posicion === -1) {
      this.datosVistos.push({
        ID: equipo.ID,
        Name: equipo.Name,
        ShortName: equipo.ShortName,
        ImageURL: equipo.ImageURL,
        Cantidad: 1,
        FechaUltimo: new Date()
      });
    } else {
      this.datosVistos[posicion].Cantidad++;
      this.datosVistos[posicion].FechaUltimo = new Date();
    }

    localStorage.setItem("resultados", JSON.stringify(this.datosVistos));
  }
}
