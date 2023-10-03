"use client";
import useAxios from "@/components/hooks/useAxios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CompanyResponse } from "@/interfaces/CompanyResponse";
import { setIdeEje } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ErrorMessage } from "formik";
import { ArrowRightCircle, X } from "lucide-react";
import { useEffect } from "react";

const FilesPage = () => {
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
  const nom_eje = data && data[0].nom_eje;
  const ruc_eje = data && data[0]?.ruc_eje;
  console.log(nom_eje, ruc_eje);
  return (
    <div className="w-full">
      <section className="bg-white border-b-2  px-2 py-1">
        <h4 className="font-bold mb-4">MODULO NUEVOS EXPEDIENTES</h4>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 justify-center ">
          <div>
            <Label className="mb-3  ">RUC</Label>
            <Input type="text" placeholder="RUC" />
            {/* <ErrorMessage/> */}
          </div>
          <div>
            <Label className="mb-3  ">Entidad/Institución</Label>
            <Input type="text" placeholder="Entidad/institucion" />
          </div>
          <div>
            <Label className="mb-3  ">Documento</Label>
            <Input type="text" placeholder="Tipo de documento" />
          </div>
          <div>
            <Label className="mb-3  ">N° de documento</Label>
            <Input type="text" placeholder="Documento" />
          </div>
          <div>
            <Label className="mb-3  ">Procedimiento</Label>
            <Input type="text" placeholder="Procedimiento" />
          </div>

          {/* <Select>
            <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {data.map((persons, index) => (
                  <div key={index}>
                    <SelectItem value=" name">{persons.name}</SelectItem>
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <div className="grid w-full gap-1.5 mb-3">
          <Label htmlFor="message">Asunto</Label>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
        <div className="flex gap-3">
          <Button>
            <ArrowRightCircle /> Siguiente
          </Button>
          <Button variant={"destructive"}>
            <X />
            Salir
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FilesPage;
