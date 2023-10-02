"use client";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  useFormikContext,
} from "formik";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import * as Yup from "yup";
import { FiSearch } from "react-icons/fi";
import useRegisterUser from "../hooks/useRegisterUser";
import Loader from "../loader/Loader";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string()
    .required("Número DNI/RUC es requerido")
    .test("len", "El número debe tener 8 u 11 dígitos", function (val) {
      if (val) {
        const valCleaned = val.trim();
        return (
          (valCleaned.length === 8 || valCleaned.length === 11) &&
          /^\d+$/.test(valCleaned)
        );
      }

      return false;
    }) as Yup.StringSchema<string>,
  userName: Yup.string().required("Nombre es requerido"),
  birthdayDate: Yup.string().required("Fecha es requerida"),
  firstNumberPhone: Yup.string().required("Número  es requerido"),
  firstEmail: Yup.string()
    .required("Email es requerido")
    .email("Ingresa un correo electrónico válido"),
  secondEmail: Yup.string()
    .required("Repite el Email")
    .nullable()
    .email("Ingresa un correo electrónico válido")
    .oneOf([Yup.ref("firstEmail"), null], "Los correos deben coincidir"),
  firstPassword: Yup.string().required("Contraseña es requerida"),

  secondPassword: Yup.string()
    .required("Repite la contraseña")
    .nullable()
    .oneOf([Yup.ref("firstPassword"), null], "las contraseñas deben coincidir"),
});
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface RegisterFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
  ide_eje: number;
  nom_eje: string;
  path_img: string;
}
const RegisterForm = ({
  isRegister,
  setIsRegister,
  ide_eje,
  nom_eje,
  path_img,
}: RegisterFormProps) => {
  const {
    searchDniFromReniec,
    onRegisterForm,
    docNumber,
    isExistPerson,
    isLoadingRegister,
  } = useRegisterUser(ide_eje, nom_eje);
  // console.log(cidUser.length);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowSeconPassword, setIsShowSeconPassword] = useState(false);
  console.log("existe persona ", isExistPerson);
  // console.log(ide_eje);
  // console.log(nom_eje);
  console.log(docNumber?.length);
  return (
    <div className="z-30">
      {isLoadingRegister && <Loader />}
      <Formik
        initialValues={{
          ide_doc: 0,
          cidusuario: "",
          userName: "",
          firstLastName: "",
          secondLastName: "",
          firstNumberPhone: "",
          secondNumberPhone: "",
          firstEmail: "",
          secondEmail: "",
          firstPassword: "",
          secondPassword: "",
          login: "solicita_cta",
          birthdayDate: "",
          url_img: `http://www.documentosvirtuales.com:3006/ppto/ejecutora/${ide_eje}/${path_img}`,
          //   ide_eje: ide_eje,
        }}
        validationSchema={validationSchema}
        onSubmit={onRegisterForm}
        validateOnBlur={false}
        // validateOnChange={true}
        className="mt-4"
        validateOnChange={true}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <section className="mb-5 ">
              <h2 className="font-bold ">Información de Contacto</h2>
              <span className="text-gray-500">
                Por favor, revise sus datos antes de llenar el formulario
                correctamente.
              </span>
              <div className="flex flex-col lg:grid xl:grid xl:grid-cols-3 lg:grid-cols-2 gap-2 px-2 py-5">
                <div className="flex flex-col  relative">
                  <label className="labelLogin font-bold" htmlFor="">
                    DNI/RUC
                  </label>
                  <div className="relative">
                    <span
                      title="Buscar Datos"
                      onClick={() =>
                        searchDniFromReniec(values.cidusuario, setFieldValue)
                      }
                      className="absolute left-3 top-2 cursor-pointer text-blue-600 hover:text-green-400"
                    >
                      <FiSearch size={26} />
                    </span>
                    <Field
                      maxLength={20}
                      type="text"
                      placeholder="Busca tu DNI"
                      name="cidusuario"
                      autoComplete="cidusuario"
                      className="focus:outline-none appearance-none border borderInput focus:ring-1 w-full px-10 py-2 rounded-3xl"
                      onBlur={() =>
                        searchDniFromReniec(values.cidusuario, setFieldValue)
                      }
                    />
                    <ErrorMessage
                      name="cidusuario"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                </div>
                {docNumber && docNumber.length >= 8 && (
                  <>
                    <div className="flex flex-col ">
                      <label className="labelLogin font-bold">Nombre</label>
                      <Field
                        name="userName"
                        id="userName"
                        type="text"
                        // value={userName}
                        disabled={isExistPerson}
                        placeholder="Lucas"
                        className=" uppercase  disabled:bg-red-100  focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                        maxLength={20}
                      />
                      <ErrorMessage
                        name="userName"
                        component="div"
                        className="text-red-500 font-bold"
                      />
                    </div>
                    {docNumber?.length === 8 && (
                      <>
                        <div className="flex flex-col ">
                          <label className="labelLogin font-bold">
                            Apellido Paterno
                          </label>
                          <Field
                            name="firstLastName"
                            type="text"
                            placeholder="Luna"
                            className=" disabled:bg-red-100  focus:outline-none uppercase   border borderInput focus:ring-1    px-3 py-2 rounded-3xl "
                            disabled={isExistPerson}
                            maxLength={20}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label className="labelLogin font-bold">
                            Apellido Materno
                          </label>
                          <Field
                            name="secondLastName"
                            type="text"
                            placeholder="Quispe"
                            className=" disabled:bg-red-100  focus:outline-none border uppercase borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                            disabled={isExistPerson}
                            maxLength={20}
                          />
                        </div>
                      </>
                    )}

                    <div className="   hidden flex-col ">
                      <label className="labelLogin font-bold">ide_doc</label>
                      <Field
                        name="ide_doc"
                        type="text"
                        placeholder="Perez"
                        className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "

                        // disabled={cidUser.length === 11}
                      />
                    </div>
                  </>
                )}
                {docNumber && (
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">
                      {docNumber && docNumber?.length >= 9
                        ? "Fecha de creacion"
                        : "Fecha de nacimiento"}
                    </label>
                    <Field
                      name="birthdayDate"
                      type="date"
                      placeholder="20/02/1969"
                      className=" disabled:bg-red-100  focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                      disabled={isExistPerson}
                      max="2099-12-12"
                      min="1900-12-12"
                    />
                    <ErrorMessage
                      name="birthdayDate"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                )}
              </div>
              <section>
                <h4 className="font-bold mb-3">Contactos</h4>
                <div className="lg:grid lg:grid-cols-2 gap-3">
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">Celular</label>
                    <Field
                      name="firstNumberPhone"
                      type="text"
                      placeholder="958658475"
                      className=" appearance-none   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                      maxLength={15}
                    />
                    <ErrorMessage
                      name="firstNumberPhone"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">Celular2</label>
                    <Field
                      maxLength={15}
                      name="secondNumberPhone"
                      type="text"
                      placeholder="987458645"
                      className=" appearance-none  focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">Email</label>
                    <Field
                      name="firstEmail"
                      type="email"
                      placeholder="jefrydep@gmail.com"
                      className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                      maxLength={30}
                    />
                    <ErrorMessage
                      name="firstEmail"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">
                      Repertir Email
                    </label>
                    <Field
                      maxLength={30}
                      name="secondEmail"
                      type="email"
                      placeholder="jefrydep@gmail.com"
                      className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                    />
                    <ErrorMessage
                      name="secondEmail"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                </div>
              </section>
              <section className="mb-5">
                <h2 className="font-bold mb-3 mt-2">Credenciales de Acceso</h2>
                <div className="  w-full">
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">Contraseña</label>
                    <div className="relative w-full">
                      <Field
                        maxLength={30}
                        name="firstPassword"
                        type={`${isShowPassword ? "text" : "password"}`}
                        placeholder="**************"
                        className="   focus:outline-none border borderInput focus:ring-1 w-full   px-10 py-2 rounded-3xl "
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
                    <ErrorMessage
                      name="firstPassword"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label className="labelLogin font-bold">
                      Repetir Contraseña
                    </label>
                    <div className="relative w-full">
                      <Field
                        maxLength={30}
                        name="secondPassword"
                        type={`${isShowSeconPassword ? "text" : "password"}`}
                        placeholder="***************"
                        className="   focus:outline-none border borderInput focus:ring-1 w-full  px-10 py-2 rounded-3xl "
                      />
                      <span
                        title="Mostrar u ocultar contraseña"
                        onClick={() =>
                          setIsShowSeconPassword(!isShowSeconPassword)
                        }
                        className="absolute  text-blue-500 inset-y-0 left-3 flex items-center pr-2 cursor-pointer hover:text-green-500"
                      >
                        {!isShowSeconPassword ? (
                          <AiFillEye size={25} />
                        ) : (
                          <AiFillEyeInvisible size={25} />
                        )}
                      </span>
                    </div>
                    <ErrorMessage
                      name="secondPassword"
                      component="div"
                      className="text-red-500 font-bold"
                    />
                  </div>
                </div>
              </section>

              <div className=" hidden flex-col ">
                <label className="labelLogin font-bold">url Image</label>
                <Field
                  name="url_img"
                  type="text"
                  placeholder="httt://img"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
              </div>
            </section>
            <div className="flex flex-col px-2 ">
              <CustomButton nameButton="Registrarse" color="bgButton" />
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-col px-2">
        <p className="text-center mb-5">____________O____________</p>
        <CustomButton
          onClick={() => setIsRegister(false)}
          nameButton="Atras"
          color="bgButton"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
