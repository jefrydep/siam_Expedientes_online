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

import { CompanyResponse } from "@/interfaces/CompanyResponse";
import Loader from "../loader/Loader";
import Article from "./Article";
import CustomMolal from "../ui/CustomModal";
import CustomModal from "../ui/CustomModal";
import { MdCancel, MdMoreVert } from "react-icons/md";
import { changeNewPassword, findAcount, verifyEmailCode } from "@/utils/users";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isOpenRecover, setIsOpenRecover] = useState(false);
  const [userDoc, setUserDoc] = useState<number>(0);
  const [userEmail, setuserEmail] = useState<string>("");
  const [userConfirmcode, setUserConfirmcode] = useState<string>("");
  const [solUserId, setSolUserId] = useState<number>();
  const [codeEmail, setCodeEmail] = useState<number>();
  const [usertoken, setUsertoken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassworAgain, setNewPassworAgain] = useState<string>("");
  const [isShowSecondPassword, setIsShowSecondPassword] = useState(false);
  const [isShowLoginPassword, setIsShowLoginPassword] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/19/${ide_eje}`;
  console.log(isShowLoginPassword);
  const { data, error, loading } = useAxios<CompanyResponse[]>(API_URL);
  const nom_eje = data && data[0].nom_eje;
  const pathImg = data && data[0]?.pat_img;
  const ruc_eje = data && data[0]?.ruc_eje;
  console.log(pathImg);
  console.log("------ ", data);
  console.log(userConfirmcode);
  console.log(usertoken);
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
    try {
      if (ruc_eje !== null && userDoc !== undefined && userEmail) {
        setIsLoading(true);
        const user = await findAcount(ide_eje, ruc_eje, userDoc, userEmail);
        const { data } = user;
        setIsLoading(false);

        if (data?.est_ado) {
          setSolUserId(data.met_dat.ide_sol);
          const result = await Swal.fire(
            "Mensaje",
            data.mes_age +
              "<br><br>Por favor, introduzca el código de confirmación que ha sido enviado a su correo electrónico.",
            "success"
          );

          console.log(result.value);
          setCodeEmail(result.value);
        } else {
          await Swal.fire("Mensaje", data.mes_age, "info");
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const verifyCode = async () => {
    try {
      if (solUserId && codeEmail && userConfirmcode) {
        setIsLoading(true);
        const isVerify = await verifyEmailCode(solUserId, userConfirmcode);
        const { data } = isVerify;
        setIsLoading(false);
        if (data.est_ado) {
          await Swal.fire("Mensaje", data.mes_age, "info");
          // setSolUserId(0);

          setUsertoken(data.met_dat.token);
          console.log(usertoken);
        } else {
          Swal.fire("Mensaje", data.mes_age, "info");
        }
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onChangePassword = async () => {
    try {
      if (usertoken && newPassword && newPassworAgain) {
        if (newPassword !== newPassworAgain) {
          Swal.fire("Mensaje", "Las contraseñas no coinciden", "info");
          return;
        }

        console.log(usertoken, newPassword, newPassworAgain);
        setIsLoading(true);
        const newPasswordResponse = await changeNewPassword(
          usertoken,
          newPassword,
          newPassworAgain
        );
        const { data } = newPasswordResponse;
        setIsLoading(false);
        if (data.est_ado) {
          Swal.fire("Mensaje", data.mes_age, "info");
          setIsOpenRecover(false);
          setUserDoc(0);
          setuserEmail("");

          setUserConfirmcode("");
          setNewPassword("");
          setNewPassworAgain("");
          setSolUserId(0);
          setUsertoken("");
          setCodeEmail(0);
        } else {
          Swal.fire("Mensaje", data.mes_age, "info");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // cambiar el tipo de datos de numbe ra numero ya que no toma el primer valor como por ejemplo el cero
  return (
    <div className=" pt-3 relative flex-col md:flex-row     flex justify-center z-30">
      {(isLoading && <Loader />) || (loading && <Loader />)}
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
                <div className="relative">
                  <Field
                    name="ccpassword"
                    type={`${isShowLoginPassword ? "text" : "password"}`}
                    placeholder="*************"
                    className="   focus:outline-none px-10 border borderInput focus:ring-1   w-full py-2 rounded-3xl "
                  />
                  <span
                    title="Mostrar u ocultar contraseña"
                    onClick={() => setIsShowLoginPassword(!isShowLoginPassword)}
                    className="absolute  text-blue-500  inset-y-0 left-3 flex items-center pr-2 cursor-pointer hover:text-green-500"
                  >
                    {!isShowLoginPassword ? (
                      <AiFillEye size={25} />
                    ) : (
                      <AiFillEyeInvisible size={25} />
                    )}
                  </span>
                </div>
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
                  onClick={() => {
                    setIsOpenRecover(false);
                    setUserDoc(0);
                    setuserEmail("");
                    setUserConfirmcode("");
                    setNewPassword("");
                    setNewPassworAgain("");
                    setSolUserId(0);
                    setUsertoken("");
                    setCodeEmail(0);
                  }}
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
              {!solUserId ? (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="flex flex-col mb-2">
                      <label className="labelLogin font-bold" htmlFor="">
                        DNI/RUC
                      </label>
                      <input
                        type="text"
                        placeholder="Ingre tu DNI O RUC"
                        name="userDoc"
                        // autoComplete="username"
                        value={userDoc || " "}
                        onChange={handleInputChange}
                        className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                        maxLength={15}
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
                        value={userEmail}
                        onChange={handleInputChange}
                        className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <CustomButton
                        nameButton="Enviar"
                        color="bg-blue-500"
                        width="min-w-[9rem]"
                        textColor="text-white"
                        onClick={findUserAcount}
                      />
                    </div>
                  </form>
                </>
              ) : null}

              {solUserId ? (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="flex flex-col">
                      <label className="labelLogin font-bold">
                        Codigo Recibido
                      </label>
                      <input
                        type="text"
                        placeholder="9856784512"
                        name="userConfirmcode"
                        // autoComplete="username"
                        value={userConfirmcode}
                        onChange={(e) => {
                          setUserConfirmcode(e.target.value);
                        }}
                        className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <CustomButton
                        nameButton="Verificar código"
                        color="bg-blue-500"
                        width="min-w-[9rem]"
                        textColor="text-white"
                        onClick={verifyCode}
                      />
                    </div>
                  </form>
                </>
              ) : null}
              {usertoken ? (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h3 className="font-bold mb-2">
                      Ingresa tu nueva contraseña
                    </h3>
                    <div className="flex flex-col   ">
                      <label className="labelLogin font-bold" htmlFor="">
                        Nueva contraseña
                      </label>
                      <div className="flex relative w-full">
                        <input
                          type={`${isShowPassword ? "text" : "password"}`}
                          placeholder="Ingresa tu nueva contraseña"
                          name="newPassword"
                          // autoComplete="username"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-10   focus:outline-none border borderInput focus:ring-1     py-2 rounded-3xl "
                        />
                        <span
                          title="Mostrar u ocultar contraseña"
                          onClick={() => setIsShowPassword(!isShowPassword)}
                          className="absolute  text-blue-500  inset-y-0 left-3 flex items-center pr-2 cursor-pointer hover:text-green-500"
                        >
                          {!isShowPassword ? (
                            <AiFillEye size={25} />
                          ) : (
                            <AiFillEyeInvisible size={25} />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="labelLogin font-bold" htmlFor="">
                        Repetir contraseña
                      </label>
                      <div className="relative w-full">
                        <input
                          type={`${isShowSecondPassword ? "text" : "password"}`}
                          placeholder="Ingresa tu constraseña otra vez"
                          name="newPassworAgain"
                          // autoComplete="username"
                          value={newPassworAgain}
                          onChange={(e) => setNewPassworAgain(e.target.value)}
                          className="   focus:outline-none border borderInput focus:ring-1 w-full   px-10 py-2 rounded-3xl "
                        />
                        <span
                          title="Mostrar u ocultar contraseña"
                          onClick={() =>
                            setIsShowSecondPassword(!isShowSecondPassword)
                          }
                          className="absolute  text-blue-500  inset-y-0 left-3 flex items-center pr-2 cursor-pointer hover:text-green-500"
                        >
                          {!isShowSecondPassword ? (
                            <AiFillEye size={25} />
                          ) : (
                            <AiFillEyeInvisible size={25} />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <CustomButton
                        nameButton="Guardar"
                        color="bg-blue-500"
                        width="min-w-[9rem]"
                        textColor="text-white"
                        onClick={onChangePassword}
                      />
                    </div>
                  </form>
                </>
              ) : null}
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
