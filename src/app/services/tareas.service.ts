import { Injectable } from '@angular/core';
import { Lista } from '../models/lista';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  lista:Lista[] = [];
  constructor() {
    this.cargarStorage();
    /*
    let lista1 = new Lista("recolectar gemas del infinito");
    const lista2 = new Lista("matar a los avengers");
      //console.log('servicio iniciado ')
      this.lista.push(lista1,lista2);*/
  }

  crearLista(titulo:string){
    let lista = new Lista(titulo);
    this.lista.push(lista);
    this.guardarStorage();

    return lista.id;
  }

  eliminarLista(li:Lista){
    this.lista = this.lista.filter( dataList =>{
      return dataList.id !== li.id;
    });
    this.guardarStorage()
    return this.lista;
  }

  editaLIsta(lista:Lista, titulo:string){
    lista.titulo =titulo;
    this.guardarStorage();
    return this.lista;
  }

  getLista(id:number | string ){
    const idT = Number(id);
    return this.lista.find(listaData =>{
      return listaData.id === idT;
    });
  }



  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.lista));
  }

  cargarStorage(){
      if(localStorage.getItem('data')){
          this.lista = JSON.parse(localStorage.getItem('data'));
      }else{
          this.lista = [];
      }

  }



}
