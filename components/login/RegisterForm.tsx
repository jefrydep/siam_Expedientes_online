"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import * as Yup from "yup";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),
  ccpassword: Yup.string().required("Contraseña es requerida"),
});

interface RegisterFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}
const RegisterForm = ({ isRegister, setIsRegister }: RegisterFormProps) => {
  const [cidUser, setCidUser] = useState("");
  const [userName, setuserName] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const searchDniFromReniec = async () => {
    console.log("hola");
    console.log(cidUser);
    try {
      const res = await axios.get(
        `${API_URL}/tramite/funciones/fn_busca_persona_desde_solicita_cta/${cidUser}`
      );
      const data = res.data;
      if (data.est_ado) {
        setuserName(data.met_dat.nom_per);
        setFirstLastName(data.met_dat.pat_per);
        setSecondLastName(data.met_dat.mat_per);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const onLogin = () => {};
  return (
    <div className="z-30">
      <Formik
        initialValues={{
          cidusuario: cidUser,
          userName: userName,
          firstLastName: firstLastName,
          secondLastName: secondLastName,
          login: "solicita_cta",
          //   ide_eje: ide_eje,
        }}
        validationSchema={validationSchema}
        onSubmit={onLogin}
        className="mt-4"
      >
        <Form>
          <section className="flex flex-col sm:grid sm:grid-cols-2 gap-5 px-2 py-5">
            <div className="flex flex-col gap-1 relative">
              <label className="labelLogin font-bold" htmlFor="">
                DNI/RUC
              </label>
              <div className="relative">
                <span
                  onClick={searchDniFromReniec}
                  className="absolute left-3 top-2 text-gray-500"
                >
                  {/* Aquí puedes agregar el icono */}
                  <FiSearch size={20} />
                </span>
                <Field
                  type="text"
                  placeholder="Ingresa tu DNI aquí"
                  name="cidusuario"
                  autoComplete="username"
                  value={cidUser}
                  onChange={(e: any) => setCidUser(e.target.value)}
                  className="focus:outline-none border borderInput focus:ring-1 px-10 py-2 rounded-3xl"
                  onBlur={searchDniFromReniec}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Nombre</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                value={userName}
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Apellido Paterno</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                value={firstLastName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Apellido Materno</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
                value={secondLastName}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Celular</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Celular</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Email</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Repertir Email</label>
              <Field
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div>
            {/* <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Observación</label>
              <Field
                rows="4"
                cols="20"
                as="textarea"
                name="ccpassword"
                type="text"
                placeholder="Juancito Perez"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div> */}
          </section>
          <div className="flex flex-col px-2 ">
            <CustomButton nameButton="Registrarse" color="bgButton" />
          </div>
        </Form>
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
