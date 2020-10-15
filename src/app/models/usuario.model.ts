export class Usuario {
  constructor(
    public numdoc: string,
    public nombre_total: string,
    public nombres: string,
    public apaterno: string,
    public amaterno: string,
    public usuario: string,
    public password: string,
    public nombre_area: string,
    public nombre_rol: string,
    public img?: string,
    public uid?: string
  ){

  }
}
