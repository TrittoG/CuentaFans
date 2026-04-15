import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public filtro: string = "";
  public datosVistos: any;

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    const res = localStorage.getItem("resultados");
    this.datosVistos = res ? JSON.parse(res).sort((x: any, y: any) => y.Cantidad - x.Cantidad) : [];
  }

  async limpiarHistorial() {
    const alert = await this.alertController.create({
      header: 'Limpiar historial',
      message: '¿Seguro que querés borrar todos los avistamientos?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Borrar todo',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem("resultados");
            this.datosVistos = [];
          }
        }
      ]
    });
    await alert.present();
  }
}
