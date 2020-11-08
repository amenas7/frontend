import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrartabla'
})
export class FiltrartablaPipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    const resultadoBusqueda = [];
    for ( const nombre of value ){

      if ( nombre.nombre_area.toLowerCase().indexOf(args) > -1 || nombre.nombre_area.toUpperCase().indexOf(args) > -1
      || nombre.nombre_area.indexOf(args) > -1 )
      resultadoBusqueda.push(nombre);
    }
    return resultadoBusqueda;
  }

}
