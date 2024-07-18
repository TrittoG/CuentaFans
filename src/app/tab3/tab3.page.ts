import { Component } from '@angular/core';
import * as result from '../../Data/resultados.json'; //aqui es la ruta donde importas el archivo json

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public filtro:string="";
  public datosVistos:any;

  constructor() {}

  ngOnInit()
  {

  }

  ionViewWillEnter()
  {
    let res = localStorage.getItem("resultados") ?? "";
    console.log(res);
    
    if(res == "")
    {
      let esquema = [{
        
                "ID": 3587,
                "Name": "Almagro",
                "ShortName": "ALM",
                "ImageURL": "https:\/\/cdn.soccerwiki.org\/images\/logos\/clubs\/266.png",
                "Cantidad": 1,
                "FechaUltimo":"3/4/2023"
    
            
        
      }];
        localStorage.setItem("resultados", JSON.stringify(esquema));
        this.datosVistos = esquema;
    }
    else
    {      
      this.datosVistos = JSON.parse(res);
      this.datosVistos = this.datosVistos.sort((x:any, y:any) => y.Cantidad - x.Cantidad);
    }
    console.log(this.datosVistos);
  }

}
