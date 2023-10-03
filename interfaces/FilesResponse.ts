export interface FilesResponse {
  items: Item[];
  meta: Meta;
  links: Links;
}

export interface Item {
  ide_pet: number;
  ano_eje: string;
  ide_sol: number;
  ide_eje: number;
  ide_tup: null;
  des_tup: string;
  ide_doc: number;
  des_doc: string;
  nro_doc: string;
  fch_reg: Date;
  fch_reg_txt: string;
  asu_nto: string;
  obs_pet: null;
  flg_cer: number;
  fch_cer: string;
  nro_dia: number;
  ide_per: number;
  ruc_dni: string;
  nom_adm: string;
  cel_001: string;
  cel_002: string;
  cor_ele: string;
  ruc_eje: string;
  nom_eje: string;
  cnt_adj: string;
  ide_exp: null;
  nro_exp: string;
  ide_pob: null;
  fch_obs_txt: null;
  fch_obs: null;
  ide_t_a: null;
  obs_m_p: null;
  obs_trb: null;
  ide_rut: number;
  cad_lar: string;
  ide_p_l: null;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
