import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),
  ccpassword: Yup.string().required("Contraseña es requerida"),
});

interface RegisterFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}
const RegisterForm = ({ isRegister, setIsRegister }: RegisterFormProps) => {
  const onLogin = () => {};
  return (
    <div className="z-30">
      <Formik
        initialValues={{
          cidusuario: "",
          ccpassword: "",
          login: "solicita_cta",
          //   ide_eje: ide_eje,
        }}
        validationSchema={validationSchema}
        onSubmit={onLogin}
        className="mt-4"
      >
        <Form>
          <section className="flex flex-col sm:grid sm:grid-cols-2 gap-5 px-2 py-5">
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold" htmlFor="">
                DNI/RUC
              </label>
              <Field
                type="text"
                placeholder="Ingresa tu DNI aquí"
                name="cidusuario"
                autoComplete="username"
                className="   focus:outline-none border borderInput focus:ring-1   px-3 py-2 rounded-3xl "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="labelLogin font-bold">Nombre</label>
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
            <div className="flex flex-col gap-1">
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
            </div>
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
          nameButton="Ingresar"
          color="bgButton"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
