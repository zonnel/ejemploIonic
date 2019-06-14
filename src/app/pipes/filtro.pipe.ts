import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista';

@Pipe({
  name: 'filtro',
  pure: false
})
export class FiltroPipe implements PipeTransform {

  transform(lista:Lista[], completado:boolean =true ):Lista[] {

    const nueva =lista.filter(data =>{
      return data.terminada === completado;
    })

    return nueva;
  }

}
