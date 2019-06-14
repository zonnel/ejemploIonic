import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Lista } from 'src/app/models/lista';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listas:Lista[];
  constructor(public servicio:TareasService, private router:Router, private alertCtrl:AlertController ) {
    this.listas=servicio.lista;
  }

  async agregarNuevo(){

  const alert = await this.alertCtrl.create({
    header: 'Alert',
    inputs:[
      {
        name:'titulo',
        type:'text',
        placeholder:'Nombre de la tarea'
      }
    ],
    buttons: [
      {
        text:'Cancelar',
        role:'cancel',
        handler:()=>{
          console.log("cancelar")
        }
      },
      {
        text:'Crear',
        handler:( data )=>{
          console.log(data)
          if(data.titulo.length===0){
            return;
          }
          const listaId = this.servicio.crearLista( data.titulo );
          this.redirigirActividades(listaId);
          //crear nuevo tarea
        }
      }
    ]
  });

  alert.present();

  }

  redirigirActividades(idtarea:number ){
    this.router.navigateByUrl( `/tabs/tab1/agregar/${ idtarea }`);
  }

}
