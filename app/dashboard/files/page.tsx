"use client";
import useAxios from "@/components/hooks/useAxios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { CompanyResponse } from "@/interfaces/CompanyResponse";
import { DocResponse } from "@/interfaces/DocResponse";
import { setIdeEje } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ArrowRightCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ValueType from "react-select";
import { DocTypes } from "@/interfaces/DocTypes";
import axios from "axios";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { Requisito, RouteResponse, Ruta } from "@/interfaces/RouteResponse";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  numDoc: Yup.string().required("Campo requerido"),
  ide_doc: Yup.string().required("Campo requerido"),
  ide_rut: Yup.string().required("Campo requerido"),
});
const FilesPage = () => {
  const { data: session, status, update } = useSession();
  const dispatch = useAppDispatch();
  const ide_eje = useAppSelector((state) => state.ide_eje.value);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/19/${ide_eje}`;
  useEffect(() => {
    const storedIdeEje = JSON.parse(localStorage.getItem("ide_eje") ?? "null");

    if (storedIdeEje) {
      dispatch(setIdeEje(storedIdeEje));
    }
  }, [dispatch]);
  const { data, error, loading } = useAxios<CompanyResponse[]>(API_URL);
  const { data: dataDoc } = useAxios<DocResponse[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/siam/vistas/Vw_doctos_cp`
  );
  // const [docType, setDocType] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  console.log(dataDoc);
  const [selectedOption, setSelectedOption] = useState(null);
  const [docOptions, setDocOptions] = useState<DocTypes[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeProcess, setSelectedTypeProcess] = useState<number>();
  const [routeFiles, setRouteFiles] = useState<Ruta[]>([]);
  const [requirements, setRequirements] = useState<Requisito[]>([]);
  const [uploadFiles, setUploadFiles] = useState(false);
  const [formDataTemp, setFormDataTemp] = useState([]);
  const currentDate = new Date();
  const route = useRouter();

  const handleNumberConvert = async (numDoc: string, setFieldValue: any) => {
    console.log(numDoc);

    numDoc = String(numDoc);

    if (numDoc.length < 8) {
      const numberOfZeros = 8 - numDoc.length;

      const zerosToAdd = Math.max(numberOfZeros, 0);

      const formattedNum = "0".repeat(zerosToAdd) + numDoc;

      console.log(formattedNum);

      setFieldValue("numDoc", formattedNum);
    } else {
      console.log(numDoc);

      setFieldValue("numDoc", numDoc);
    }
  };
  const handleSubmitFiles = async (values: any) => {
    setFormDataTemp(values);
    console.log(values);
    localStorage.setItem("formData", JSON.stringify(values));
  };
  const transformedData = dataDoc?.map((item) => ({
    value: item.ide_doc,
    label: item.des_doc,
  }));

  const handleDocTypes = (query: any) => {
    setSearchQuery(query);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/trami_cp/funciones/fn_api_obt_ruta/${ide_eje}/2023?txt_bsq=${query}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDocOptions(response.data);
        } else {
          setDocOptions([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setDocOptions([]);
      });
  };
  const docOptionsFormated = docOptions.map((doc) => ({
    value: doc.ide_rut,
    label: doc.des_rut,
  }));
  const dateToString = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  const currentDateFormated = dateToString(currentDate);
  console.log(currentDateFormated);
  // console.log(transformedData);
  // console.log(value);
  console.log(docOptions);
  // console.log(docType);
  const handleRouteFiles = async (ideRoute: number) => {
    console.log(ideRoute);
    try {
      const response = await axios.get<RouteResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/trami_cp/funciones/fn_obt_detalles_ruta_cp/${ideRoute}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      const res = response.data;
      setRouteFiles(res.ruta);
      setRequirements(res.requisitos);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(routeFiles);
  // aveces requisitos me trae null
  console.log(requirements);
  console.log(formDataTemp);
  return (
    <div className="w-full h-screen overflow-y-auto">
      <section className="bg-white border-b-2  px-2 py-1">
        <h4 className="font-bold mb-4">MODULO NUEVOS EXPEDIENTES</h4>
        <Tabs defaultValue="registro" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registro">Registro</TabsTrigger>

            <TabsTrigger value="archivos">subida de Archivos</TabsTrigger>
          </TabsList>
          <TabsContent value="registro">
            <div>
              {data && dataDoc && (
                <Formik
                  initialValues={{
                    ano_eje: "2023",
                    rucEje: data && data[0].ruc_eje,
                    nomEje: data && data[0]?.nom_eje,
                    ide_doc: "",
                    numDoc: "",
                    ide_rut: "",
                    ideEje: ide_eje,
                    obs_pet: "",
                    flg_cer: 0,
                    flg_c_p: "1",
                    fch_reg: currentDate,
                    asu_nto: "",

                    // doc_eje: "",
                  }}
                  onSubmit={handleSubmitFiles}
                  validateOnBlur={false}
                  validationSchema={validationSchema}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <section className="flex flex-col lg:grid lg:grid-cols-2 gap-4 justify-center ">
                        <div>
                          <Label className="mb-3  ">RUC</Label>
                          <Field
                            disabled
                            type="text"
                            name="rucEje"
                            placeholder="RUC"
                            as={Input}
                          />
                          {/* <ErrorMessage/> */}
                        </div>
                        <div>
                          <Label className="mb-3  ">Entidad/Institución</Label>
                          <Field
                            disabled
                            type="text"
                            name="nomEje"
                            placeholder="Entidad/institucion"
                            as={Input}
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label className="mb-3  ">Documento</Label>
                          <Select
                            name="ide_doc"
                            options={transformedData}
                            isSearchable={true} // Habilita la búsqueda
                            placeholder="Selecciona una opción"
                            // onChange={(value: any) => setSelectedOption(value.label)}
                            onChange={(option) =>
                              setFieldValue("ide_doc", option?.value)
                            }
                          />
                          <ErrorMessage
                            name="ide_doc"
                            div
                            className="text-red-300 text-xs"
                          />
                        </div>

                        <div>
                          <Label className="mb-3  ">N° de documento</Label>
                          <Field
                            name="numDoc"
                            type="number"
                            placeholder="Documento"
                            as={Input}
                            onBlur={() =>
                              handleNumberConvert(values.numDoc, setFieldValue)
                            }
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label className="mb-3  ">Procedimiento</Label>
                          <Select
                            name="ide_rut"
                            options={
                              (docOptionsFormated && docOptionsFormated) || null
                            }
                            isSearchable={true} // Habilita la búsqueda
                            placeholder="Buscar tipo de solicitud"
                            onInputChange={handleDocTypes}
                            // onChange={(value: any) => setSelectedOption(value.label)}
                            onChange={(option) => {
                              const selectedValue = option?.value;
                              const asunto = option?.label;

                              if (typeof selectedValue === "number") {
                                setSelectedTypeProcess(selectedValue);
                                setFieldValue("ide_rut", selectedValue);
                                setFieldValue("asu_nto", asunto);
                                handleRouteFiles(selectedValue);

                                // setRouteFiles("requirement", requirements);
                              }
                            }}
                          />
                        </div>
                      </section>
                      <div className="mt-5 mb-5 border pb-3 px-2">
                        <h4 className="font-bold text-center mb-3 ">
                          Ruta del proceso
                        </h4>
                        <div className="flex gap-2 flex-wrap">
                          {routeFiles.map((route, index) => (
                            <div
                              key={index}
                              className="bg-white relative border-green-600 border min-w-[20rem] rounded-lg shadow-lg p-3 h-40"
                            >
                              <div className="absolute right-0 text-white font-bold top-0 rounded-bl-lg p-3 rounded-tr-lg bg-green-500">
                                {index + 1}
                              </div>
                              <div className=" flex gap-3">
                                <h4 className="text-orange-500">
                                  Tiempo estimado:
                                </h4>
                                <span>{route.nro_min}</span>
                              </div>
                              <div className="bg-green-500 text-sm text-white rounded-bl-lg rounded-br-lg p-1  absolute bottom-0 right-0 left-0">
                                <span>{route.nom_amb} </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid w-full gap-1.5 mb-3">
                        <Label htmlFor="message">Asunto</Label>
                        <Field
                          maxLength={200}
                          as={Textarea}
                          name="asu_nto"
                          placeholder="Asunto"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button variant={"destructive"}>
                          <X />
                          Salir
                        </Button>

                        <Button type="submit">
                          <ArrowRightCircle />
                          Siguiente
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default FilesPage;
