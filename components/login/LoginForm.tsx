"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
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

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/19/${ide_eje}`;

  const { data, error, loading } = useAxios<CompanyResponse[]>(API_URL);
  const nom_eje = data && data[0].nom_eje;
  const pathImg = data && data[0].pat_img;
  console.log("------ ", data);
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

  return (
    <div className=" pt-3 relative flex-col md:flex-row     flex justify-center z-30">
      {isLoading && <Loader />}

      <div className="flex  w-full  md:w-auto flex-col md:flex-row">
        <section className="bg-purple-400 px-2 py-4 shadow-2xl md:rounded-l-3xl">
          <h4>{nom_eje}</h4>
          <div>
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
         ${isRegister ? "md:w-[43rem]" : "md:w-[25rem]"}
         transition-opacity duration-1000`}
        >
          <div className="  m-3 flex justify-center font-bold">
            {/* <FaUserCircle size={75} color="green" /> */}
          </div>
          <h3 className="font-bold">
            ¡Bienvenido! Por favor ingresa tus datos
          </h3>

          {isRegister ? (
            <RegisterForm
              path_img={pathImg}
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
              </Form>
            </Formik>
          )}
          {!isRegister && (
            <div className="flex flex-col px-2">
              <p className="text-center mb-5">____________O____________</p>
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