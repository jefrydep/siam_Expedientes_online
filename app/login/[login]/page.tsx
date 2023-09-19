"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoginForm from "@/components/login/LoginForm";
import useAxios from "@/components/hooks/useAxios";

const LoginPage = ({ params }: { params: { ide_eje: number } }) => {
  const [ide_eje, setIde_eje] = useState(params.ide_eje);
  const { data: session, status } = useSession();
  const [rotColor, setrotColor] = useState({});
  // console.log(ide_eje);
  // console.log(session);

  useEffect(() => {
    // const getGlobalColors = async () => {
    //   const colorsUrl = `https://api.pagosvirtualesperu.com/poli/funciones/fn_obt_detalles_poli_web?ide_eje=${login}`;
    //   const resp = await axios.get(colorsUrl);
    //   setrotColor(resp.data);
    // };
    // getGlobalColors();
    // colors: {
    //     bgNavbar: "#088A85",
    //   },
  }, []);
  useEffect(() => {
    Object.entries(rotColor).forEach(([variable, valor]) => {
      document.documentElement.style.setProperty(
        `--${variable}`,
        valor as string
      );
    });
    localStorage.setItem("customColors", JSON.stringify(rotColor));
  }, [rotColor]);

  return (
    <div className=" bg-gray-100  pt-5    w-full   ">
      <LoginForm ide_eje={ide_eje} />

      <svg
        className="fixed bottom-0 z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          className="waveBg z-0"
          fillOpacity={1}
          d="M0,64L48,96C96,128,192,192,288,229.3C384,267,480,277,576,266.7C672,256,768,224,864,218.7C960,213,1056,235,1152,240C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default LoginPage;
