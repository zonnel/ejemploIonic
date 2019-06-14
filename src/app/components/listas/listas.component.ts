import { Component, OnInit, Input } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada:boolean;
  listas:Lista[];
  constructor(public servicio:TareasService, private router:Router, private alertCtrl:AlertController) {
    this.listas=servicio.lista;
  }

  ngOnInit() {}

  redirigirActividades(idtarea:number ){
    if(this.terminada){
        this.router.navigateByUrl( `/tabs/tab2/agregar/${ idtarea }`);
    }else{
        this.router.navigateByUrl( `/tabs/tab1/agregar/${ idtarea }`);
    }
  }

  redirigir(item:Lista){
    this.redirigirActividades(item.id);
  }

  borrarActividad(lista:Lista){
    this.listas=this.servicio.eliminarLista(lista);
  }

  async editarLista(lista:Lista){

        const alert = await this.alertCtrl.create({
          header: 'Alert',
          inputs:[
            {
              name:'titulo',
              type:'text',
              value:lista.titulo
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
              text:'Guardar',
              handler:( data )=>{
                console.log(data)
                if(data.titulo.length===0){
                  return;
                }
                this.listas=this.servicio.editaLIsta(lista,data.titulo);
                //this.servicio.guardarStorage();
                //this.redirigirActividades(listaId);
                //crear nuevo tarea
              }
            }
          ]
        });

        alert.present();
  }
}
