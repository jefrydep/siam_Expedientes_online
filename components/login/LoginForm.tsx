"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";

import Swal from "sweetalert2";
import { ValuesLogin } from "@/interfaces/ValuesLogin";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import CustomButton from "../ui/CustomButton";
import RegisterForm from "./RegisterForm";
import useAxios from "../hooks/useAxios";
import time from "../../public/img/watch.svg";
import news from "../../public/img/news.svg";
import doc from "../../public/img/doc.svg";

import Image from "next/image";
import { CompanyResponse } from "@/interfaces/CompanyResponse";
import Loader from "../loader/Loader";
import Article from "./Article";
import CustomMolal from "../ui/CustomModal";
import CustomModal from "../ui/CustomModal";
import { MdCancel, MdMoreVert } from "react-icons/md";
import useRecoverPassword from "../hooks/useRecoverPassword";
import { findAcount } from "@/utils/users";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),
  ccpassword: Yup.string().required("Contraseña es requerida"),
});

interface PropsLogin {
  ide_eje: number;
}
const LoginForm = ({ ide_eje }: PropsLogin) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const [isOpenRecover, setIsOpenRecover] = useState(false);
  const [userDoc, setUserDoc] = useState<number>(0);
  const [userEmail, setuserEmail] = useState<string>("");
  const [userConfirmcode, setUserConfirmcode] = useState<number>(0);
  const [setsolUserId, setSetsolUserId] = useState<number>();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/19/${ide_eje}`;

  const { data, error, loading } = useAxios<CompanyResponse[]>(API_URL);
  const nom_eje = data && data[0].nom_eje;
  const pathImg = data && data[0]?.pat_img;
  const ruc_eje = data && data[0]?.ruc_eje;
  console.log(pathImg);
  console.log("------ ", data);

  // const { findUserAcount } = useRecoverPassword(
  //   ide_eje,
  //   ruc_eje,
  //   userDoc,
  //   userEmail
  // );
  // Resto de tu código aquí...

  const onLogin = async (
    { cidusuario, ccpassword, login, ide_eje }: ValuesLogin,
    actions: FormikHelpers<ValuesLogin>
  ) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        cidusuario,
        ccpassword,
        login,
        ide_eje,
        redirect: false,
      });

      if (res?.error) {
        console.log("Error de autenticación:", res.error);

        setIsLoading(false);

        Swal.fire({
          confirmButtonColor: "#01DFD7",
          icon: "error",
          title: "Acceso no autorizado",
          text: "Credenciales incorrectas",
        });
        // seterror("Credenciales incorrectas");
        setTimeout(() => {
          //   seterror("");
          actions.resetForm();
        }, 2000);
      } else if (res?.ok) {
        router.push("/dashboard/home");

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleIsRegisterChange = (value: boolean) => {
    setIsRegister(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "userDoc") {
      setUserDoc(parseInt(value));
    } else if (name === "userEmail") {
      setuserEmail(value);
    }
    console.log("userDoc:", userDoc);
    console.log("userEmail:", userEmail);
  };

  const findUserAcount = async () => {
    if (ruc_eje !== null && userDoc !== undefined && userEmail) {
      const user = await findAcount(ide_eje, ruc_eje, userDoc, userEmail);
      const { data } = user;
      if (data.est_ado) {
        setsolUserId(data.met_dat.ide_sol);
        await Swal.fire(
          "Mensaje",
          data.mes_age +
            "<br><br>Por favor, introduzca el código de confirmación que ha sido enviado a su correo electrónico.",
          "success"
        );
      } else {
        await Swal.fire("Mensaje", data.mes_age, "info");
      }
    }
  };

  return (
    <div className=" pt-3 relative flex-col md:flex-row     flex justify-center z-30">
      {isLoading || (loading && <Loader />)}
      {!isRegister && (
        <div className="">
          <Article
            imgPath={time}
            subtitle="Horario de Atencion"
            title="Consideración N°1"
            content=" La presentación de documentos a través de nuestra plataforma
                virtual, se realizará de acuerdo a nuestro horario de atención
                al usuario: 8:00am - 4:00pm de Lunes a Viernes."
          />
          <Article
            imgPath={news}
            subtitle="Información registrada"
            title="Consideración N°2"
            content=" Como usuario registrado de este servicio, será responsable del
            contenido y registro de la información que presente. Estos
            tienen carácter de declaración jurada."
          />
        </div>
      )}
      <div className="flex  flex-col w-full  xl:w-auto xl:flex-row">
        <section className="bg-purple-400 px-2   py-4 flex-col  shadow-2xl lg:rounded-l-3xl">
          <h4 className="text-center mb-3 font-bold">{nom_eje}</h4>
          <div className="w-full flex justify-center">
            {data && (
              <img
                src={`http://www.documentosvirtuales.com:3006/ppto/ejecutora/${ide_eje}/${data[0].pat_img}`}
                alt=""
              />
            )}
          </div>
          {/* <CustomButton
            nameButton="Seleccionar entidad ejecutora"
            color="bgButton"
          /> */}
        </section>
        <div
          className={`px-2 bg-white md:rounded-r-3xl md:border shadow-2xl pb-9
         ${isRegister ? "xl:max-w-[68rem] md:w-full " : "xl:w-[25rem]"}
         transition-opacity duration-1000`}
        >
          <div className="  m-3 flex justify-center font-bold">
            {/* <FaUserCircle size={75} color="green" /> */}
          </div>
          <h3 className="font-bold text-center">
            ¡Bienvenido! Por favor ingresa tus datos
          </h3>

          {isRegister ? (
            <RegisterForm
              path_img={pathImg! && pathImg}
              ide_eje={ide_eje}
              isRegister={isRegister}
              setIsRegister={handleIsRegisterChange}
              nom_eje={nom_eje!}
            />
          ) : (
            <Formik
              initialValues={{
                cidusuario: "",
                ccpassword: "",
                login: "solicita_cta",
                ide_eje: ide_eje,
              }}
              validationSchema={validationSchema}
              onSubmit={onLogin}
              className={`mt-4 transition-opacity duration-1000 ${
                isRegister ? "opacity-10" : "opacity-100"
              }`}
            >
              <Form className="flex flex-col gap-5 px-2 py-5 z-30">
                <label className="labelLogin font-bold" htmlFor="">
                  Usuario
                </label>
                <ErrorMessage
                  name="cidusuario"
                  component="div"
                  className="text-red-500 font-bold"
                />
                <Field
                  type="text"
                  placeholder="Ingresa tu nombre de usuario"
                  name="cidusuario"
                  autoComplete="username"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
                <label className="labelLogin font-bold">Contraseña</label>
                <ErrorMessage
                  name="ccpassword"
                  component="div"
                  className="text-red-500 font-bold"
                />
                <Field
                  name="ccpassword"
                  type="password"
                  placeholder="*************"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
                <CustomButton nameButton="Ingresar" color="bgButton" />
                <span
                  title="Recupera tu contraseña"
                  onClick={() => setIsOpenRecover(!isOpenRecover)}
                  className="text-sm  text-blue-600 hover:border-b cursor-pointer"
                >
                  ¿Has olvidado tu contraseña?
                </span>
              </Form>
            </Formik>
          )}
          <CustomModal isOpen={isOpenRecover}>
            <section className="bg-white px-4 w-[35rem] rounded-lg shadow-md pt-4 pb-6">
              <div className="flex w-full  justify-end ">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOpenRecover(false)}
                >
                  <MdCancel
                    title="Cerrar
                          "
                    className="hover:text-red-400 text-red-600"
                    size={45}
                  />
                </div>
              </div>
              <h3 className="font-bold mb-3">Recuperar contraseña</h3>

              <div className="flex flex-col mb-2">
                <label className="labelLogin font-bold" htmlFor="">
                  DNI/RUC
                </label>
                <input
                  type="number"
                  placeholder="Ingre tu DNI O RUC"
                  name="userDoc"
                  // autoComplete="username"
                  value={userDoc || " "}
                  onChange={handleInputChange}
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
              </div>
              <div className="flex flex-col">
                <label className="labelLogin font-bold" htmlFor="">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo/email"
                  name="userEmail"
                  // autoComplete="username"
                  value={userEmail}
                  onChange={handleInputChange}
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
              </div>
              <div className="flex justify-end mt-4">
                {/* <CustomButton
                          nameButton="Cancelar"
                          color="bg-red-500"
                          width="min-w-[9rem]"
                          textColor="text-white"
                        /> */}
                <CustomButton
                  nameButton="Enviar"
                  color="bg-blue-500"
                  width="min-w-[9rem]"
                  textColor="text-white"
                  onClick={findUserAcount}
                />
              </div>
              <div className="flex flex-col">
                <label className="labelLogin font-bold">Codigo Recibido</label>
                <input
                  type="number"
                  placeholder="9856784512"
                  name="userConfirmcode"
                  // autoComplete="username"
                  value={userConfirmcode}
                  onChange={(e) => {
                    setUserConfirmcode(+e.target.value);
                  }}
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
              </div>
              <div className="flex justify-end mt-4">
                {/* <CustomButton
                  nameButton="Enviar codigo"
                  color="bg-blue-500"
                  width="min-w-[9rem]"
                  textColor="text-white"
                  onClick={findUserAcount}
                /> */}
              </div>
            </section>
          </CustomModal>
          {!isRegister && (
            <div className="flex flex-col px-2">
              {/* <p className="text-center mb-5">____________O____________</p> */}
              <CustomButton
                onClick={() => setIsRegister(true)}
                nameButton="Registrarse"
                color="bgButton"
              />
              {/* <LoginForms /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
