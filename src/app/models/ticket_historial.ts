export class TicketHistorial {
  constructor(
    public usuario_completo: string,
    public nombre_esp: string,
    public nombre_area: string,
    public fecha_reg: string,
    public detalle_inci: string,
    public estado: string,
    public nombre_tipo_inci: string,
    public serie: string,
    public nombre_prioridad: string,
    public IDprioridad: string,
    public personaid?: string,
    public tipoincid?: string,
    public ticketid?: string
  ){

  }
}
