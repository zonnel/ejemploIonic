import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista';
import { ListItem } from 'src/app/models/list-item';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  private tareaActual:Lista;
  nombreItem=''
  constructor( private servicio:TareasService, private route:ActivatedRoute, private alertCtrl:AlertController) {
    const idTarea = route.snapshot.paramMap.get('idTarea')
    this.tareaActual=servicio.getLista(idTarea);
    console.log(this.tareaActual);
  }

  ngOnInit() {
  }


  agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListItem(this.nombreItem);
    this.tareaActual.items.push(nuevoItem);
    this.nombreItem='';
    this.servicio.guardarStorage();
  }

  cambioItem(item:ListItem){
    //item.completado=!item.completado
    const pendientes = this.tareaActual.items.filter(tareaData =>{
      return !tareaData.completado;
    })

    if(pendientes.length === 0){
      this.tareaActual.terminadoEn= new Date();
      this.tareaActual.terminada=true;
    }else{
      this.tareaActual.terminadoEn = null;
      this.tareaActual.terminada = false;
    }

    this.servicio.guardarStorage();
  }


  borrar(indice:number){
    this.tareaActual.items.splice(indice,1);
    this.servicio.guardarStorage();
  }

  async editar(indice:number){

    const alert = await this.alertCtrl.create({
      header: 'Alert',
      inputs:[
        {
          name:'descripccion',
          type:'text',
          value:this.tareaActual.items[indice].descripcion
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
            if(data.descripccion.length===0){
              return;
            }
            this.tareaActual.items[indice].descripcion=data.descripccion;
            this.servicio.guardarStorage();
            //this.redirigirActividades(listaId);
            //crear nuevo tarea
          }
        }
      ]
    });

    alert.present();
  }

}
