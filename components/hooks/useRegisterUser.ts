import { RegisterValues } from "@/interfaces/RegisterValues";
import { FindPerson } from "@/interfaces/findPerson";
import {
  createNewPerson,
  createNewProfile,
  getInfoUser,
  isEmailValid,
} from "@/utils/users";
import { data } from "autoprefixer";
import { FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Swal from "sweetalert2";

const useRegisterUser = (ide_eje: number, nom_eje: string) => {
  console.log(ide_eje, nom_eje);

  const [docNumber, setDocNumber] = useState<string>();
  const [dataPerson, setDataPerson] = useState<FindPerson>();
  const [isExistPerson, setIsExistPerson] = useState(false);
  const [isLoadingRegister, setIsLoading] = useState(false);
  const router = useRouter();

  // const searchDniFromReniec = async (cidUser: string, setFieldValue: any) => {
  //   setDocNumber(cidUser.trim());
  //   const cidusuarioLength = cidUser.trim().length;
  //   const newIdeDoc = cidusuarioLength === 8 ? 4 : 6;
  //   setFieldValue("ide_doc", newIdeDoc);

  //   try {
  //     const user = await getInfoUser(cidUser.trim());

  //     const data = user.data;
  //     setDataPerson(data);
  //     console.log(data);

  //     if (data.est_ado) {

  //       setIsExistPerson(true);
  //       const newUser = data.met_dat.nom_per;
  //       const firstLastName = data.met_dat.pat_per;
  //       const secondLastName = data.met_dat.mat_per;
  //       const birhtdayDate = data.met_dat.fch_nac;
  //       setFieldValue("userName", newUser);
  //       setFieldValue("firstLastName", firstLastName);
  //       setFieldValue("secondLastName", secondLastName);
  //       setFieldValue("birthdayDate", birhtdayDate);
  //       // setFieldValue("ide_doc", newIdeDoc);
  //     } else if (!data.est_ado && data.met_dat === null) {
  //       setIsExistPerson(false);
  //       Swal.fire(`${data.mes_age}`);

  //       setFieldValue("userName", "");
  //       setFieldValue("firstLastName", "");
  //       setFieldValue("secondLastName", "");
  //       setFieldValue("birthdayDate", "");
  //     } else {
  //       Swal.fire(`${data.mes_age}`);
  //       setFieldValue("cidusuario", "");
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const searchDniFromReniec = async (cidUser: string, setFieldValue: any) => {
    // setDataPerson()
    // setDataPerson();

    if (cidUser.trim() === docNumber) return;
    if (cidUser.trim().length !== 8 && cidUser.trim().length !== 11) {
      Swal.fire({
        html: `<span style="color: blue;">(Por favor, ingrese un valor de 8(DNI) u 11(RUC) caracteres)</span>`,
      });
      setFieldValue("userName", "");
      setFieldValue("firstLastName", "");
      setFieldValue("secondLastName", "");
      setFieldValue("birthdayDate", "");
      return;
    }
    if (cidUser.trim()) {
      console.log(cidUser.trim());
      setIsLoading(true);
      setDocNumber(cidUser.trim());
      const cidusuarioLength = cidUser.trim().length;
      const newIdeDoc = cidusuarioLength === 8 ? 4 : 6;
      setFieldValue("ide_doc", newIdeDoc);

      try {
        const user = await getInfoUser(cidUser.trim());

        const data = user.data;
        setIsLoading(false);
        setDataPerson(data);
        console.log(data);

        if (data.est_ado) {
          setIsExistPerson(true);
          const newUser = data.met_dat.nom_per;
          const firstLastName = data.met_dat.pat_per;
          const secondLastName = data.met_dat.mat_per;
          const birhtdayDate = data.met_dat.fch_nac;
          setFieldValue("userName", newUser);
          setFieldValue("firstLastName", firstLastName);
          setFieldValue("secondLastName", secondLastName);
          setFieldValue("birthdayDate", birhtdayDate);
        } else if (!data.est_ado && data.met_dat === null) {
          setIsExistPerson(false);

          Swal.fire({
            icon: "info",
            title: ` ${data.mes_age}`,
            text: "Por favor llene el formulario con sus datos personales",
            confirmButtonText: "Aceptar",
          });

          setFieldValue("userName", "");
          setFieldValue("firstLastName", "");
          setFieldValue("secondLastName", "");
          setFieldValue("birthdayDate", "");
        } else {
          Swal.fire(`${data.mes_age}`);
          setFieldValue("cidusuario", "");
        }
        console.log(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };
  const handleRefresh = () => {
    window.location.reload();
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
    try {
      console.log("registroi ejeuctado");
      setIsLoading(true);

      // const nom_per = userName.toUpperCase();
      // const pat_per = firstLastName.toUpperCase();
      // const mat_per = secondLastName.toUpperCase();

      if (dataPerson?.est_ado) {
        const ide_per = dataPerson && dataPerson.met_dat.ide_per;

        const newProfile = {
          ide_per,
          nro_doc: cidusuario.toString(),
          nom_per: userName,
          pat_per: firstLastName,
          mat_per: secondLastName,
          fch_nac: birthdayDate,
          cor_ele: firstEmail,
          pas_log: firstPassword,
          pas_log_rep: secondPassword,
          cel_001: firstNumberPhone.toString(),
          cel_002: secondNumberPhone.toString(),
          ide_doc: ide_doc,
          ide_eje: +ide_eje,
          nom_eje: nom_eje,
          url_img: url_img,
        };

        const validEmail = await isEmailValid(firstEmail);
        const isValidEmail = validEmail.data;
        console.log(isValidEmail);

        if (!isValidEmail) {
          const createProfile = await createNewProfile(
            ide_per,
            undefined,
            newProfile
          );

          let isValidCode = false;
          while (!isValidCode) {
            const result = await Swal.fire({
              title: `${createProfile.data.mes_age}`,
              text: "Por favor, Ingrese el código de confirmación que ha sido enviado a su correo electrónico.",
              input: "text",
              confirmButtonText: "Enviar",
              cancelButtonText: "Cancelar",
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

              console.log(dataPerson);
              console.log(dataPerson.data.est_ado);
              if (
                dataPerson.data.est_ado === true &&
                dataPerson.data.met_dat !== null
              ) {
                isValidCode = true;
                // Swal.fire({
                //   icon: "success",
                //   text: dataPerson.data.mes_age,
                // });

                const res = await signIn("credentials", {
                  cidusuario,
                  ccpassword: firstPassword,
                  login: "solicita_cta",
                  ide_eje,
                  redirect: false,
                });

                if (res?.error) {
                  console.log("Error de autenticación:", res.error);

                  Swal.fire({
                    confirmButtonColor: "#01DFD7",
                    icon: "error",
                    title: "Acceso no autorizado",
                    text: "Credenciales incorrectas",
                  });
                } else if (res?.ok) {
                  router.push("/dashboard/home");
                }
              } else {
                await Swal.fire({
                  icon: "error",
                  text: dataPerson.data.mes_age,
                });
              }
            } else {
              handleRefresh();
              break;
            }
          }
        } else {
          Swal.fire(
            `El correo electrónico ingresado ya está asociado a una cuenta existente.`
          );
        }
      } else if (!dataPerson?.est_ado) {
        console.log("registrar new persona");

        const validEmail = await isEmailValid(firstEmail);
        const isValidEmail = validEmail.data;
        console.log(isValidEmail);

        if (!isValidEmail) {
          const newPerson = {
            ide_doc: +ide_doc,
            nro_doc: cidusuario.toString(),
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
            nro_doc: cidusuario.toString(),
            nom_per: userName,
            pat_per: firstLastName,
            mat_per: secondLastName,
            fch_nac: birthdayDate,
            cor_ele: firstEmail,
            pas_log: firstPassword,
            pas_log_rep: secondPassword,
            cel_001: firstNumberPhone.toString(),
            cel_002: secondNumberPhone.toString(),
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
              text: "Por favor, Ingrese el código de confirmación que ha sido enviado a su correo electrónico.",
              input: "text",
              confirmButtonText: "Enviar",
              cancelButtonText: "Cancelar",
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
              console.log(dataPerson);
              console.log(dataPerson.data);
              if (
                dataPerson.data.est_ado === true &&
                dataPerson.data.met_dat !== null
              ) {
                isValidCode = true;
                // Swal.fire({
                //   icon: "success",
                //   // title: "",
                //   text: `${dataPerson.data.mes_age}`,
                // });
                const res = await signIn("credentials", {
                  cidusuario,
                  ccpassword: firstPassword,
                  login: "solicita_cta",
                  ide_eje,
                  redirect: false,
                });

                if (res?.error) {
                  console.log("Error de autenticación:", res.error);

                  Swal.fire({
                    confirmButtonColor: "#01DFD7",
                    icon: "error",
                    title: "Acceso no autorizado",
                    text: "Credenciales incorrectas",
                  });
                } else if (res?.ok) {
                  router.push("/dashboard/home");
                }
              } else {
                await Swal.fire({
                  icon: "error",
                  // title: "Error",
                  text: `${dataPerson.data.mes_age}`,
                });
              }
            } else {
              handleRefresh();
              break;
            }
          }
        } else {
          Swal.fire(
            `El correo electrónico ingresado ya está asociado a una cuenta existente.`
          );
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return {
    searchDniFromReniec,
    onRegisterForm,
    docNumber,
    isExistPerson,
    isLoadingRegister,
  };
};

export default useRegisterUser;
