"use client";
import useAxios from "@/components/hooks/useAxios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { CompanyResponse } from "@/interfaces/CompanyResponse";
import { DocResponse } from "@/interfaces/DocResponse";
import { addRequirement, setIdeEje } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { ArrowRightCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ValueType from "react-select";
import { DocTypes } from "@/interfaces/DocTypes";
import Axios from "axios";

import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { Requisito, RouteResponse, Ruta } from "@/interfaces/RouteResponse";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Yup from "yup";
import { columnsFiles } from "@/components/ui/columnsFiles";
import { DataTable } from "@/components/ui/data-table";
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

  const [open, setOpen] = useState(false);

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
  const [filesDAta, setFilesDAta] = useState([]);
  const [files, setFiles] = useState<any[]>([]);

  const token = session?.user.access_token;
  const dateToString = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  const currentDateFormated = dateToString(currentDate);
  // const { setFieldValue, values } = useFormikContext<any>();

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

  const dispatchRequirements = useAppDispatch();
  const handleSubmitFiles = async (values: any) => {
    setFormDataTemp(values);
    console.log(values.files);
    // const uniqueFileNames = new Set(values.files.map((file: any) => file.name));
    // console.log(uniqueFileNames);
    // const filesName = new Set(files.map((file: any) => file.name));
    // console.log(filesName);
    console.log(values);
    const formData = new FormData();
    formData.append("ano_eje", values.ano_eje);
    formData.append("ide_eje", values.ideEje);
    formData.append("ide_doc", values.ide_doc);
    formData.append("nro_doc", values.numDoc);
    formData.append("fch_reg", values.fch_reg);
    formData.append("asu_nto", values.asu_nto);
    formData.append("ide_rut", values.ide_rut);
    // valores por defecto
    formData.append("obs_pet", "");
    formData.append("flg_cer", "0");
    formData.append("flg_c_p", "1");

    console.log(requirements);
    const requirementsFormated = requirements.map((req, index) => ({
      ide_doc: req.ide_doc,
      fch_doc: currentDateFormated,
      fch_reg: currentDateFormated,
      ide_fil: null,
      ide_rcr: req.ide_rcr,
      fil_idx: index,
    }));

    if (values.files) {
      console.log(values.files);
      values.files.forEach((file: any) => {
        formData.append(`files[]`, file);
      });
    }
    console.log(files);
    // formData.append(`files`, filesName);

    formData.append("arr_doc_anx", JSON.stringify(requirementsFormated));
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    // const response = await axios.post(
    //   `http://192.168.1.191:3006/tramite/peticion/files`,
    //   formData,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   },
    //   onUploadProgress: (progress) => {
    //     const { total, loaded } = progress;
    //     let totalSizeInMB: number;
    //     // @ts-ignore
    //     totalSizeInMB = total / 1000000;
    //     const loadedSizeInMB = loaded / 1000000;
    //     const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
    //     setUploadPercentage(uploadPercentage.toFixed(2));

    // });
    // const response = await Axios({
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    //   method: "POST",
    //   data: formData,
    //   url: "", // Ruta
    //   baseURL: "https://api.pagosvirtualesperu.com/tramite/peticion/files", // URL local
    //   onUploadProgress: (progress: any) => {
    //     const { total, loaded } = progress;
    //     let totalSizeInMB: number;
    //     // @ts-ignore
    //     totalSizeInMB = total / 1000000;
    //     const loadedSizeInMB = loaded / 1000000;
    //     const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
    //     console.log(total, " - ", loadedSizeInMB, " - ", uploadPercentage);
    //     //        setUploadPercentage(uploadPercentage.toFixed(2));
    //   },
    // });
    // const res = response.data;
    // console.log(res);
  };
  const transformedData = dataDoc?.map((item) => ({
    value: item.ide_doc,
    label: item.des_doc,
  }));

  const handleDocTypes = (query: any) => {
    setSearchQuery(query);
    Axios.get(
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

  const handleRouteFiles = async (ideRoute: number) => {
    // console.log(ideRoute);
    try {
      const response = await Axios.get<RouteResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/trami_cp/funciones/fn_obt_detalles_ruta_cp/${ideRoute}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  // console.log(routeFiles);
  // aveces requisitos me trae null
  console.log(requirements);
  console.log(files);
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

                    fch_reg: currentDateFormated,
                    asu_nto: "",
                    files: [],

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
                              console.log(selectedValue);

                              if (typeof selectedValue === "number") {
                                setSelectedTypeProcess(selectedValue);
                                console.log(selectedValue);
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
                      <section>
                        <h4 className="font-bold mb-5">Subida de archivos</h4>
                        <hr />
                        <div>
                          <h5 className="font-bold">
                            Adjuntar Archivos en formato PDF
                          </h5>
                          <div>
                            {/* <table>
                              <thead>
                                <tr>
                                  <th>Archivo</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {requirements.map((req, idx) => (
                                    <td>
                                      <input
                                        type="file"
                                        accept=".pdf"
                                        data-ide_rcr={req.ide_rcr}
                                        data-idx={idx}
                                        onChange={(event: any) => {
                                          const ide_rcr =
                                            event.currentTarget.getAttribute(
                                              "data-ide_rcr"
                                            );
                                          const idx =
                                            event.currentTarget.getAttribute(
                                              "data-idx"
                                            );

                                          if (
                                            event.currentTarget.files.length > 0
                                          ) {
                                            const selectedFile =
                                              event.currentTarget.files[0];
                                            const lfiles = [...files];
                                            selectedFile.name;
                                            let idx = lfiles.findIndex(
                                              (file) =>
                                                file.name === selectedFile.name
                                            );
                                            if (idx >= 0) {
                                              let idx = requirements.findIndex(
                                                (file) =>
                                                  file.ide_rcr ===
                                                  selectedFile.ide_rcr
                                              );
                                              if (idx >= 0) {
                                                let lrequirements = [
                                                  ...requirements,
                                                ];
                                                lrequirements[idx].fil_idx =
                                                  idx;
                                                setRequirements(lrequirements);
                                              }
                                            } else
                                              idx =
                                                lfiles.push(selectedFile) - 1;

                                            console.log(
                                              "index",
                                              idx,
                                              lfiles.length
                                            );
                                            setFiles(lfiles);

                                            // Crear un nuevo arreglo de requisitos actualizado con nombre y peso del archivo
                                            // const updatedRequirements =
                                            //   requirements.map(
                                            //     (req, reqIdx) => {
                                            //       if (reqIdx === Number(idx)) {
                                            //         // Cuando idx coincide con el índice del requisito
                                            //         return {
                                            //           ...req,
                                            //           name: selectedFile.name,
                                            //           size: selectedFile.size,
                                            //         };
                                            //       }
                                            //       return req;
                                            //     }
                                            //   );

                                            // setRequirements(
                                            //   updatedRequirements
                                            // );
                                          }
                                        }}
                                      />
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table> */}
                            <div className="w-full grid grid-cols-13 p-2 bg-green-400">
                              <div className="col-span-2">Acciones</div>
                              <div className="col-span-2">Tipo Doc</div>
                              <div className="col-span-2">Descripción</div>
                              <div>N° Doc</div>
                              <div>Fch.Doc</div>
                              <div className="col-span-2">Nombre Arch.</div>
                              <div>Tipo Arch.</div>
                              <div>Cant Pag.</div>
                              <div>Peso</div>
                            </div>
                            {requirements.map((req, idx) => (
                              <div className="w-full grid   gap-2 p-3 border text-sm  grid-cols-13">
                                <Input
                                  className="col-span-2"
                                  type="file"
                                  accept=".pdf"
                                  data-ide_rcr={req.ide_rcr}
                                  data-idx={idx}
                                  onChange={(event: any) => {
                                    if (event.currentTarget.files.length > 0) {
                                      const selectedFile =
                                        event.currentTarget.files[0];
                                      const lfiles = [...files];
                                      selectedFile.name;
                                      let idx = lfiles.findIndex(
                                        (file) =>
                                          file.name === selectedFile.name
                                      );
                                      if (idx >= 0) {
                                        let idx = requirements.findIndex(
                                          (file) =>
                                            file.ide_rcr ===
                                            selectedFile.ide_rcr
                                        );
                                        if (idx >= 0) {
                                          let lrequirements = [...requirements];
                                          lrequirements[idx].fil_idx = idx;
                                          setRequirements(lrequirements);
                                        }
                                      } else
                                        idx = lfiles.push(selectedFile) - 1;

                                      console.log("index", idx, lfiles.length);
                                      setFiles(lfiles);

                                      // Crear un nuevo arreglo de requisitos actualizado con nombre y peso del archivo
                                      const updatedRequirements =
                                        requirements.map((req, reqIdx) => {
                                          if (reqIdx === Number(idx)) {
                                            // Cuando idx coincide con el índice del requisito
                                            return {
                                              ...req,
                                              name: selectedFile.name,
                                              size: selectedFile.size,
                                            };
                                          }
                                          return req;
                                        });

                                      setRequirements(updatedRequirements);
                                    }
                                  }}
                                />

                                <div className="col-span-2">
                                  {req.des_doc_pad}
                                </div>
                                <div className="col-span-2">{req.des_doc}</div>
                                <div>N° Doc</div>
                                <div>
                                  <input type="text" />
                                </div>
                                <div className="col-span-2">{req.name}</div>
                                <div>Tipo Arch.</div>
                                <div>Cant Pag.</div>
                                <div className="  bg-blue-500">{req.size}</div>
                              </div>
                            ))}

                            {/* <DataTable
                              columns={columnsFiles}
                              data={requirements}
                            /> */}
                            {/* <TableFiles /> */}
                          </div>
                        </div>
                      </section>

                      <div className="flex gap-3">
                        <Button variant={"destructive"}>
                          <X />
                          Salir
                        </Button>

                        <Button type="submit">
                          <ArrowRightCircle />
                          Enviar
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
