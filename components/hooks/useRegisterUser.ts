import { RegisterValues } from "@/interfaces/RegisterValues";
import { FindPerson } from "@/interfaces/findPerson";
import {
  createNewPerson,
  getCodeToConfirm,
  getInfoUser,
  isEmailValid,
} from "@/utils/users";
import axios from "axios";
import Email from "next-auth/providers/email";
import React, { useState } from "react";
import Swal from "sweetalert2";
interface PropsUseRegister {
  ide_eje: number;
  nom_eje: string;
}
const useRegisterUser = (ide_eje: number, nom_eje: string) => {
  console.log(ide_eje, nom_eje);
  const [docNumber, setDocNumber] = useState<string>();
  const [dataPerson, setDataPerson] = useState<FindPerson>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchDniFromReniec = async (cidUser: string, setFieldValue: any) => {
    setDocNumber(cidUser);

    try {
      const user = await getInfoUser(cidUser);

      const data = user.data;
      setDataPerson(data);
      console.log(data);
      //   console.log(data);
      if (data.est_ado) {
        const cidusuarioLength = cidUser.trim().length;
        const newIdeDoc = cidusuarioLength === 8 ? 4 : 6;
        console.log(newIdeDoc);
        const newUser = data.met_dat.nom_per;
        const firstLastName = data.met_dat.pat_per;
        const secondLastName = data.met_dat.mat_per;
        const birhtdayDate = data.met_dat.fch_nac;
        setFieldValue("userName", newUser);
        setFieldValue("firstLastName", firstLastName);
        setFieldValue("secondLastName", secondLastName);
        setFieldValue("birthdayDate", birhtdayDate);
        setFieldValue("ide_doc", newIdeDoc);
      } else {
        Swal.fire(`${data.mes_age}`);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const onRegisterForm = async ({
    cidusuario,
    userName,
    firstLastName,
    secondLastName,
    birthdayDate,
    ide_doc,
    firstEmail,
    secondEmail,
    firstPassword,
    secondPassword,
    firstNumberPhone,
    secondNumberPhone,
    url_img,
  }: RegisterValues) => {
    console.log(
      cidusuario,
      userName,
      firstLastName,
      secondLastName,
      birthdayDate,
      ide_doc,
      firstEmail
    );
    try {
      console.log("registroi ejeuctado");

      //   const newPerson = {
      //     ide_doc: +ide_doc,
      //     nro_doc: cidusuario,
      //     nom_per: userName,
      //     pat_per: firstLastName,
      //     mat_per: secondLastName,
      //     fch_nac: birthdayDate,
      //   };
      //   console.log(dataPerson);

      const iderPer = dataPerson && dataPerson.met_dat.ide_per;

      const newProfile = {
        ide_per: iderPer,
        nro_doc: cidusuario,
        nom_per: userName,
        pat_per: firstLastName,
        mat_per: secondLastName,
        fch_nac: birthdayDate,
        cor_ele: firstEmail,
        pas_log: firstPassword,
        pas_log_rep: secondPassword,
        cel_001: firstNumberPhone,
        cel_002: secondNumberPhone,
        ide_doc: ide_doc,
        ide_eje: ide_eje,
        nom_eje: nom_eje,
        url_img: url_img,
      };

      if (dataPerson?.est_ado === true) {
        console.log("hey");
        const validEmail = await isEmailValid(firstEmail);
        const isValidEmail = validEmail.data;
        if (isValidEmail) {
          console.log("estamos aqui");
          const createProfile = await getCodeToConfirm(
            iderPer,
            undefined,
            newProfile
          );
          console.log(createProfile.data);
        }
      } else {
        console.log("ocurrio algo");
      }
      //   if (iderPer! > 0) {

      //     console.log("el usuario ya esta registrado");
      //   } else {
      //     const validEmail = await isEmailValid(firstEmail);
      //     const isValidEmail = validEmail.data;

      //     if (!isValidEmail) {
      //       const newPersonData = await createNewPerson(newPerson);
      //       const data = newPersonData.data;
      //       console.log(data);
      //     } else {
      //       Swal.fire(
      //         `El correo electrónico ingresado ya está asociado a una cuenta existente.`
      //       );
      //     }
      //   }
    } catch (error) {
      console.error(error);
    }
  };
  return { searchDniFromReniec, onRegisterForm, docNumber };
};

export default useRegisterUser;
