"use client";
import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import * as Yup from "yup";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),
  ccpassword: Yup.string().required("Contraseña es requerida"),
});

interface RegisterFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}
const RegisterForm = ({ isRegister, setIsRegister }: RegisterFormProps) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const searchDniFromReniec = async (cidUser: string, setFieldValue: any) => {
    console.log(cidUser);

    console.log("hola");

    try {
      const res = await axios.get(
        `${API_URL}/tramite/funciones/fn_busca_persona_desde_solicita_cta/${cidUser}`
      );
      const data = res.data;
      console.log(data);
      if (data.est_ado) {
        const newUser = data.met_dat.nom_per;
        const firstLastName = data.met_dat.pat_per;
        const secondLastName = data.met_dat.mat_per;
        setFieldValue("userName", newUser);
        setFieldValue("firstLastName", firstLastName);
        setFieldValue("secondLastName", secondLastName);
      } else {
        Swal.fire(`${data.mes_age}`);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(cidUser.length);
  const onLogin = () => {};
  return (
    <div className="z-30">
      <Formik
        initialValues={{
          cidusuario: "",
          userName: "",
          firstLastName: "",
          secondLastName: "",
          login: "solicita_cta",
          //   ide_eje: ide_eje,
        }}
        validationSchema={validationSchema}
        onSubmit={onLogin}
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
              </>
              {/* )} */}

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
