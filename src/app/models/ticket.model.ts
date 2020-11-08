export class Ticket {

    constructor(
    public ticketid: string,
    public IDtipo_inci: string,
    public nombre_tipo_inci: string,
    public IDpersona: string,
    public usuario: string,
    public nombre_persona: string,
    public serie: string,
    public usuario_completo: string,
    public nombre_area: string,
    public fecha_reg: string,
    public detalle_ticket: string,
    public estado_nombre: string,
    public estado: string,
    public IDprioridad: string,
    public nombre_prioridad: string,
    public nombre_esp: string,
    public IDespecialista_u: string,
    ){

    }

}

// export class Ticket {
//   constructor(
//     public usuario_completo: string,
//     public nombre_esp: string,
//     public nombre_area: string,
//     public fecha_reg: string,
//     public detalle_inci: string,
//     public estado: string,
//     public estado_nombre: string,
//     public nombre_tipo_inci: string,
//     public serie: string,
//     public nombre_prioridad: string,
//     public IDprioridad: string,
//     public personaid?: string,
//     public tipoincid?: string,
//     public ticketid?: string,
//     public IDespecialista_u?: string
//   ){

//   }
// }
