"use client";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { LucideBarChartHorizontalBig, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import useAxios from "@/components/hooks/useAxios";
import axios, { AxiosResponse } from "axios";
import useAxiosPost from "@/components/hooks/useAxiosPost";
import { FilesResponse, Item } from "@/interfaces/FilesResponse";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIdeEje } from "@/redux/features";
import { config } from "process";
const validationSchemaDate = Yup.object().shape({
  startDate: Yup.date()
    .required("Fecha de inicio requerida")
    .max(
      Yup.ref("endDate"),
      "La fecha de inicio no puede ser mayor que la fecha final"
    ),
  endDate: Yup.date().required("Fecha final requerida"),
});
interface ValuesDate {
  startDate: string;
  endDate: string;
}
const HomePage = () => {
  const currentDate = new Date();
  // Calcula la fecha de inicio (actual - 31 días)
  const startDateValue = new Date();
  startDateValue.setDate(currentDate.getDate() - 31);

  const { data: session, status, update } = useSession();
  const [userFilesData, setUserFilesData] = useState<Item[]>([]);
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/trami_cp/vistas/vw_peticion_cp?fch_ini=2023-01-01&fch_fin=2023-12-01&ide_eje=1769`;

  console.log(session);
  // const { data } = useAxiosPost<FilesResponse>(
  //   API_URL,
  //   session?.user.access_token
  // );
  const dispatch = useAppDispatch();
  const ide_eje = useAppSelector((state) => state.ide_eje.value);
  useEffect(() => {
    const storedIdeEje = JSON.parse(localStorage.getItem("ide_eje") ?? "null");

    if (storedIdeEje) {
      dispatch(setIdeEje(storedIdeEje));
    }
  }, [dispatch]);
  const dateToString = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  const formatedCurrenDate = dateToString(currentDate);
  const formatedStartDate = dateToString(startDateValue);
  // const getUserFiles = async () => {
  //   const res = await axios.post(API_URL, {
  //     headers: {
  //       Authorization: `Bearer ${session?.user.access_token}`,
  //     },
  //   });
  //   setUserFilesData(res.data);
  // };

  // console.log(data);
  // console.log(session?.user.access_token);

  const handlerSearchfile = async ({ startDate, endDate }: ValuesDate) => {
    console.log(session?.user.access_token);
    try {
      console.log(startDate, endDate);
      const res = await axios.post<FilesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/trami_cp/vistas/vw_peticion_cp?fch_ini=${startDate}&fch_fin=${endDate}&ide_eje=${ide_eje}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      const data = res.data;
      setUserFilesData(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full   bg-slate-50">
      <section className="bg-white border-b-2  px-2 py-1 ">
        <h3 className="font-bold mb-2">SOLICITUD DE EXPEDIENTES </h3>
        <div className=" mb-3 flex gap-8">
          <Formik
            initialValues={{
              startDate: formatedStartDate,
              endDate: formatedCurrenDate,
            }}
            onSubmit={handlerSearchfile}
            validationSchema={validationSchemaDate}
          >
            {({ values, handleChange }) => (
              <Form className=" flex gap-2   ">
                <div>
                  <Label htmlFor="expedientes"> Desde</Label>
                  <Input
                    className="max-w-[12rem]"
                    type="date"
                    name="startDate"
                    placeholder="Buscar Expediente"
                    value={values.startDate}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="startDate" className="text-red-400" />
                </div>
                <div>
                  <Label htmlFor="expedientes"> Hasta</Label>
                  <Input
                    name="endDate"
                    className="max-w-[12rem]"
                    type="date"
                    placeholder="Buscar Expediente"
                    value={values.endDate}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="endDate" className="text-red-400" />
                </div>
                <div className="flex items-end">
                  <Button className="" type="submit">
                    <span>
                      <Search />
                    </span>
                    Buscar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <section className="flex  items-end">
            <Link href={"/dashboard/files"}>
              <Button>
                <span>
                  {" "}
                  <PlusCircle />
                </span>{" "}
                Agregar nuevo expediente
              </Button>
            </Link>
          </section>
        </div>
      </section>

      <section className="px-2 py-1">
        <Label htmlFor="expedientes"> Expediente</Label>
        <div className="flex gap-2 max-w-sm min-w-[30rem]">
          <Input className=" " type="text" placeholder="Buscar Expediente" />
          <Button>
            <span>
              <Search />
            </span>
            Buscar
          </Button>
        </div>
        <div className="mt-7">
          {userFilesData && (
            <DataTable columns={columns} data={userFilesData} />
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
