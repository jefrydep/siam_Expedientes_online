import { newPerson } from "@/interfaces/RegisterValues";
import { CreateProfile } from "@/interfaces/ValuesLogin";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getInfoUser = async (nro_doc: string) => {
  const res = await axios.get(
    `${API_URL}/tramite/funciones/fn_busca_persona_desde_solicita_cta/${nro_doc}`
  );
  return res;
};
export const createNewPerson = async (newPerson: newPerson) => {
  const res = await axios.post(`${API_URL}/siam/funciones/fn_crea_personas/`, {
    ...newPerson,
  });

  return res;
};
export const isEmailValid = async (email: string) => {
  const res = await axios.get(
    `${API_URL}/tramite/solicita-cta/verifica_email/${email}`
  );
  return res;
};
export const createNewProfile = async (
  p_ide_per: number | undefined = undefined,
  p_cod_con: string | undefined = undefined,
  profile: CreateProfile
) => {
  const res = await axios.post(
    `${API_URL}/tramite/funciones/fn_solicita_cta_confirmado/${p_ide_per}/${p_cod_con}`,
    profile
  );
  return res;
};

export const findAcount = async (
  ide_eje: number,
  ruc_eje: number,
  user_log: number,
  user_email: string
) => {
  const res = await axios.get(
    `${API_URL}/siam/usuarios/reset-password/${ide_eje}/${ruc_eje}/${user_log}/${user_email}`
  );
  return res;
};
