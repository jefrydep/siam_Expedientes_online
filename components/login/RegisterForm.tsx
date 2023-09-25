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
import axios from "axios";
import Swal from "sweetalert2";
import useRegisterUser from "../hooks/useRegisterUser";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),

  firstEmail: Yup.string()
    .required("Email es requerido")
    .email("Ingresa un correo electrónico válido"),
  secondEmail: Yup.string()
    .required("Repite el Email")
    .nullable()
    .email("Ingresa un correo electrónico válido")
    .oneOf([Yup.ref("firstEmail"), null], "Los correos deben coincidir"),
  firstPassword: Yup.string().required("Contraseña es requerida"),
  // .min(6, "La contraseña debe tener al menos 6 caracteres"),
  secondPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("firstPassword"), null], "las contraseñas deben coincidir"),
});

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
  const { searchDniFromReniec, onRegisterForm } = useRegisterUser(
    ide_eje,
    nom_eje
  );
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // console.log(cidUser.length);
  console.log(ide_eje);
  console.log(nom_eje);
  return (
    <div className="z-30">
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
            <section className="flex flex-col sm:grid sm:grid-cols-2 gap-5 px-2 py-5">
              <div className="flex flex-col gap-1 relative">
                <label className="labelLogin font-bold" htmlFor="">
                  DNI/RUC
                </label>
                <div className="relative">
                  <span
                    // onClick={searchDniFromReniec}
                    className="absolute left-3 top-2 text-gray-500"
                  >
                    {/* Aquí puedes agregar el icono */}
                    <FiSearch size={20} />
                  </span>
                  <Field
                    type="text"
                    placeholder="Busca tu DNI"
                    name="cidusuario"
                    autoComplete="cidusuario"
                    // onChange={(e: any) => setCidUser(e.target.value.trim())}
                    className="focus:outline-none border borderInput focus:ring-1 px-10 py-2 rounded-3xl"
                    onBlur={() =>
                      searchDniFromReniec(values.cidusuario, setFieldValue)
                    }
                  />
                </div>
              </div>
              {/* {cidUser.length >= 8 && ( */}
              <>
                <div className="flex flex-col gap-1">
                  <label className="labelLogin font-bold">Nombre</label>
                  <Field
                    name="userName"
                    id="userName"
                    type="text"
                    // value={userName}
                    placeholder="Lucas"
                    className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="labelLogin font-bold">
                    Apellido Paterno
                  </label>
                  <Field
                    name="firstLastName"
                    type="text"
                    placeholder="Luna"
                    className="   focus:outline-none   border borderInput focus:ring-1    px-3 py-2 rounded-3xl "

                    // disabled={cidUser.length === 11}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="labelLogin font-bold">
                    Apellido Materno
                  </label>
                  <Field
                    name="secondLastName"
                    type="text"
                    placeholder="Perez"
                    className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "

                    // disabled={cidUser.length === 11}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="labelLogin font-bold">
                    Fecha de nacimiento
                  </label>
                  <Field
                    name="birthdayDate"
                    type="text"
                    placeholder="31/07/1995"
                    className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "

                    // disabled={cidUser.length === 11}
                  />
                </div>
                <div className="flex flex-col gap-1">
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
              {/* )} */}

              <div className="flex flex-col gap-1">
                <label className="labelLogin font-bold">Celular</label>
                <Field
                  name="firstNumberPhone"
                  type="text"
                  placeholder="958658475"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="labelLogin font-bold">Celular2</label>
                <Field
                  name="secondNumberPhone"
                  type="text"
                  placeholder="987458645"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="labelLogin font-bold">Email</label>
                <Field
                  name="firstEmail"
                  type="text"
                  placeholder="Juancito Perez"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
                <ErrorMessage
                  name="firstEmail"
                  component="div"
                  className="text-red-500 font-bold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="labelLogin font-bold">Repertir Email</label>
                <Field
                  name="secondEmail"
                  type="text"
                  placeholder="Juancito Perez"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
                <ErrorMessage
                  name="secondEmail"
                  component="div"
                  className="text-red-500 font-bold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="labelLogin font-bold">Contraseña</label>
                <Field
                  name="firstPassword"
                  type="text"
                  placeholder="Juancito Perez"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
                <ErrorMessage
                  name="firstPassword"
                  component="div"
                  className="text-red-500 font-bold"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="labelLogin font-bold">
                  Repetir Contraseña
                </label>
                <Field
                  name="secondPassword"
                  type="text"
                  placeholder="Juancito Perez"
                  className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                />
                <ErrorMessage
                  name="secondPassword"
                  component="div"
                  className="text-red-500 font-bold"
                />
              </div>
              <div className="flex flex-col gap-1">
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
