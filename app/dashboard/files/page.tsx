"use client";
import useAxios from "@/components/hooks/useAxios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  // Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { RouteResponse, Ruta } from "@/interfaces/RouteResponse";
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

  console.log(selectedOption);
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
    console.log(values);
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(routeFiles);
  return (
    <div className="w-full">
      <section className="bg-white border-b-2  px-2 py-1">
        <h4 className="font-bold mb-4">MODULO NUEVOS EXPEDIENTES</h4>

        <div>
          {data && dataDoc && (
            <Formik
              initialValues={{
                rucEje: data && data[0].ruc_eje,
                nomEje: data && data[0]?.nom_eje,
                docType: "",
                numDoc: "",
                typeProcess: "",
                ideEje: ide_eje,
                obs_pet: "",
                flg_cer: 0,
                flg_c_p: "1",

                // doc_eje: "",
              }}
              onSubmit={handleSubmitFiles}
              validateOnBlur={false}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <section className="flex flex-col lg:grid lg:grid-cols-2 gap-4 justify-center ">
                    <div>
                      <Label className="mb-3  ">RUC</Label>
                      <Field
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
                        type="text"
                        name="nomEje"
                        placeholder="Entidad/institucion"
                        as={Input}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-3  ">Documento</Label>
                      <Select
                        name="doctype"
                        options={transformedData}
                        isSearchable={true} // Habilita la búsqueda
                        placeholder="Selecciona una opción"
                        // onChange={(value: any) => setSelectedOption(value.label)}
                        onChange={(option) =>
                          setFieldValue("docType", option?.value)
                        }
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
                      <Label className="mb-3  ">Documento</Label>
                      <Select
                        name="typeProcess"
                        options={
                          (docOptionsFormated && docOptionsFormated) || null
                        }
                        isSearchable={true} // Habilita la búsqueda
                        placeholder="Buscar tipo de solicitud"
                        onInputChange={handleDocTypes}
                        // onChange={(value: any) => setSelectedOption(value.label)}
                        onChange={(option) => {
                          const selectedValue = option?.value;

                          if (typeof selectedValue === "number") {
                            setSelectedTypeProcess(selectedValue);
                            setFieldValue("typeProcess", selectedValue);
                            handleRouteFiles(selectedValue);
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
                  <div className="flex gap-3">
                    <Button variant={"destructive"}>
                      <X />
                      Salir
                    </Button>
                    <Button type="submit">
                      <ArrowRightCircle /> Siguiente
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
        <div className="grid w-full gap-1.5 mb-3">
          <Label htmlFor="message">Asunto</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
      </section>
    </div>
  );
};

export default FilesPage;
