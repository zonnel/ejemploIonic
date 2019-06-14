export class ListItem
{
  descripcion:string;
  completado:boolean;

  constructor(desc:string){
    this.descripcion=desc;
    this.completado=false;
  }
  
}
