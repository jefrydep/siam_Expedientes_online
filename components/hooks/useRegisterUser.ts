import { RegisterValues } from "@/interfaces/RegisterValues";
import { FindPerson } from "@/interfaces/findPerson";
import {
  createNewPerson,
  createNewProfile,
  getInfoUser,
  isEmailValid,
} from "@/utils/users";
import { useState } from "react";
import Swal from "sweetalert2";

const useRegisterUser = (ide_eje: number, nom_eje: string) => {
  console.log(ide_eje, nom_eje);
  const [docNumber, setDocNumber] = useState<string>();
  const [dataPerson, setDataPerson] = useState<FindPerson>();
  const searchDniFromReniec = async (cidUser: string, setFieldValue: any) => {
    setDocNumber(cidUser.trim());
    const cidusuarioLength = cidUser.trim().length;
    const newIdeDoc = cidusuarioLength === 8 ? 4 : 6;
    setFieldValue("ide_doc", newIdeDoc);

    try {
      const user = await getInfoUser(cidUser);

      const data = user.data;
      setDataPerson(data);
      console.log(data);
      //   console.log(data);
      if (data.est_ado) {
        // const cidusuarioLength = cidUser.trim().length;
        // const newIdeDoc = cidusuarioLength === 8 ? 4 : 6;
        // console.log(newIdeDoc);
        const newUser = data.met_dat.nom_per;
        const firstLastName = data.met_dat.pat_per;
        const secondLastName = data.met_dat.mat_per;
        const birhtdayDate = data.met_dat.fch_nac;
        setFieldValue("userName", newUser);
        setFieldValue("firstLastName", firstLastName);
        setFieldValue("secondLastName", secondLastName);
        setFieldValue("birthdayDate", birhtdayDate);
        // setFieldValue("ide_doc", newIdeDoc);
      } else {
        Swal.fire(`${data.mes_age}`);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Llamar a la función para mostrar el cuadro de diálogo de confirmación

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

      //   console.log(dataPerson);

      if (dataPerson?.est_ado) {
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
          ide_eje: +ide_eje,
          nom_eje: nom_eje,
          url_img: url_img,
        };

        const validEmail = await isEmailValid(firstEmail);
        const isValidEmail = validEmail.data;

        if (!isValidEmail) {
          const createProfile = await createNewProfile(
            iderPer,
            undefined,
            newProfile
          );

          let isValidCode = false;
          while (!isValidCode) {
            const result = await Swal.fire({
              title: `${createProfile.data.mes_age}`,
              text: "Por favor, introduzca el código de confirmación que ha sido enviado a su correo electrónico.",
              input: "text",
              confirmButtonText: "Enviar",
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return "Este campo es requerido";
                }
              },
            });
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
              console.log(result.value);
              const dataPerson = await createNewProfile(
                iderPer,
                result.value,
                newProfile
              );
              console.log(dataPerson);
              console.log(dataPerson.data.est_ado);
              if (dataPerson.data.est_ado === true) {
                isValidCode = true;
                Swal.fire({
                  icon: "success",
                  text: dataPerson.data.mes_age,
                });
              } else {
                await Swal.fire({
                  icon: "error",
                  text: dataPerson.data.mes_age,
                });
              }
            } else {
              break;
            }
          }
        } else {
          Swal.fire(
            `El correo electrónico ingresado ya está asociado a una cuenta existente.`
          );
        }
      } else if (!dataPerson?.est_ado && dataPerson?.met_dat === null) {
        console.log("registrar new persona");

        const validEmail = await isEmailValid(firstEmail);
        const isValidEmail = validEmail.data;

        if (!isValidEmail) {
          const newPerson = {
            ide_doc: +ide_doc,
            nro_doc: cidusuario,
            nom_per: userName,
            pat_per: firstLastName,
            mat_per: secondLastName,
            fch_nac: birthdayDate,
          };
          console.log(newPerson);
          const newDataPerson = await createNewPerson(newPerson);
          console.log(newDataPerson);
          console.log(newDataPerson.status);
          console.log("creando persona");
          const ide_per = newDataPerson.data.met_dat[0].ide_per;
          const newProfile = {
            ide_per: ide_per,
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
            ide_eje: +ide_eje,
            nom_eje: nom_eje,
            url_img: url_img,
          };
          const createProfile = await createNewProfile(
            ide_per,
            undefined,
            newProfile
          );
          let isValidCode = false;
          while (!isValidCode) {
            const result = await Swal.fire({
              title: `${createProfile.data.mes_age}`,
              text: "Por favor, introduzca el código de confirmación que ha sido enviado a su correo electrónico.",
              input: "text",
              confirmButtonText: "Enviar",
              showLoaderOnConfirm: true,
              allowOutsideClick: false,
              allowEscapeKey: false,

              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return "Este campo es requerido";
                }
              },
            });
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
              console.log(result.value);
              const dataPerson = await createNewProfile(
                ide_per,
                result.value,
                newProfile
              );
              console.log(dataPerson.data.est_ado);
              if (dataPerson.data.est_ado === true) {
                isValidCode = true;
                Swal.fire({
                  icon: "success",
                  // title: "",
                  text: `${dataPerson.data.mes_age}`,
                });
              } else if (dataPerson.data.est_ado === false) {
                await Swal.fire({
                  icon: "error",
                  // title: "Error",
                  text: `${dataPerson.data.mes_age}`,
                });
              }
            } else {
              break;
            }
          }
        } else {
          Swal.fire(
            `El correo electrónico ingresado ya está asociado a una cuenta existente.`
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { searchDniFromReniec, onRegisterForm, docNumber };
};

export default useRegisterUser;
