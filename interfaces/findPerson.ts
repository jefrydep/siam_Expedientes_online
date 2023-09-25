export interface FindPerson {
  est_ado: boolean;
  mes_age: string;
  met_dat: MetDAT;
}

export interface MetDAT {
  dir_per: string;
  fch_nac: Date;
  fot_per: null;
  ide_per: number;
  mat_per: string;
  nom_com: string;
  nom_per: string;
  nro_doc: string;
  pat_per: string;
}
