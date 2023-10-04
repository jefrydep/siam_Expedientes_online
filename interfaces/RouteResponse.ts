export interface RouteResponse {
  ruta: Ruta[];
  requisitos: Requisito[];
}

export interface Requisito {
  ide_rcr: number;
  ide_doc: number;
  abr_doc: string;
  des_doc: string;
  des_doc_pad: string;
}

export interface Ruta {
  ide_rmo: number;
  nro_mov: number;
  ide_rut: number;
  ide_t_a: number;
  ide_amb: number;
  nom_amb: string;
  ide_trb: number;
  ide_acc: number;
  nro_min: number;
}
