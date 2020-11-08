


export interface CargarIncidencia {
  ok: boolean;
  incidencias: Incidencia[];
}

export interface Incidencia {
  incidenciaid: number;
  IDtipo_inci: number;
  nombre_tipo_inci: string;
  IDpersona: number;
  IDusuario: number;
  usuario: string;
  nombre_persona: string;
  usuario_completo: string;
  nombre_area: string;
  fecha_reg: string;
  detalle_inci: string;
  estado_nombre: string;
  estado: number;
}
