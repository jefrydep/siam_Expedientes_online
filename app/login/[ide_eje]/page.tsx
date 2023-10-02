"use client";
import { useEffect, useState } from "react";

import LoginForm from "@/components/login/LoginForm";

const LoginPage = ({ params }: { params: { ide_eje: number } }) => {
  const ide_eje = params.ide_eje;
  const [rotColor, setrotColor] = useState({});
  console.log(ide_eje);
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
    <div className="   pt-5  pb-20     ">
      {/* <section className="flex px-2 flex-col lg:grid  lg:grid-cols-3 container m-auto">
        <article className=" ">
          <h6 className="text-center mb-1">Consideración N°1</h6>
          <div className="flex">
            <div>
              <Image src={time} height={500} alt="mision" priority />
            </div>
            <div>
              <h4 className="mb-2">Horario de Atencion</h4>
              <p className="text-justify">
                La presentación de documentos a través de nuestra plataforma
                virtual, se realizará de acuerdo a nuestro horario de atención
                al usuario: 8:00am - 4:00pm de Lunes a Viernes.
              </p>
            </div>
          </div>
        </article>
        <article className=" ">
          <h6 className="text-center mb-1">Consideración N°2</h6>
          <div className="flex">
            <div>
              <Image src={news} height={500} alt="mision" priority />
            </div>
            <div>
              <h4 className="mb-2">Información registrada</h4>
              <p className="text-justify">
                Como usuario registrado de este servicio, será responsable del
                contenido y registro de la información que presente. Estos
                tienen carácter de declaración jurada.
              </p>
            </div>
          </div>
        </article>
        <article className=" ">
          <h6 className="text-center mb-1">Consideración N°3</h6>
          <div className="flex">
            <div>
              <Image src={doc} height={500} alt="mision" priority />
            </div>
            <div>
              <h4 className="mb-2">Documentación a registrar</h4>
              <p className="text-justify">
                Registrar toda la información que la municipalidad requiera para
                la presentación de documentos, así como también la documentación
                y demás archivos, deberán ser adjuntados en formatos legibles.
              </p>
            </div>
          </div>
        </article>
      </section> */}
      {/* <h1 className=" text-center  ">
        Bienvenidos al Sistema de Gestión Documental - SGD
      </h1>
      <h2 className="text-center text-sm">
        Antes de realizar su trámite, lea las siguintes consideraciones.
      </h2> */}
      <div className="   ">
        {/* <h1 className=" text-center  ">
        Bienvenidos al Sistema de Gestión Documental - SGD
      </h1>
      <h2 className="text-center text-sm">
        Antes de realizar su trámite, lea las siguintes consideraciones.
      </h2> */}

        <LoginForm ide_eje={ide_eje} />
        {/* <Article
          imgPath={doc}
          subtitle="Horario de Atencion"
          title="Consideración N°1"
          content=" La presentación de documentos a través de nuestra plataforma
                virtual, se realizará de acuerdo a nuestro horario de atención
                al usuario: 8:00am - 4:00pm de Lunes a Viernes."
        /> */}
      </div>
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
