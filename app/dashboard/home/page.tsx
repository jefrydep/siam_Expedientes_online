"use client";
import { Button } from "@/components/ui/button";
import { Payment, columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getSession, useSession } from "next-auth/react";
import React from "react";

import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { Form, Formik } from "formik";

const HomePage = () => {
  const { data: session, status, update } = useSession();

  const data: Payment[] = [
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
    { id: 1, name: "jefry", lastName: "Palomino", age: 25 },
  ];
  console.log(session);
  const handlerSearchfile = async () => {};
  return (
    <div className="w-full   bg-slate-100">
      <section className="bg-white border-b-2  px-2 py-1 ">
        <h3 className="font-bold mb-2">SOLICITUD DE EXPEDIENTES </h3>
        <div className=" mb-3 flex gap-8">
          <Formik
            initialValues={{ startDate: "", endDate: "" }}
            onSubmit={handlerSearchfile}
          >
            <Form className=" flex gap-2   items-center">
              <Label htmlFor="expedientes"> Desde</Label>
              <Input
                className="max-w-[12rem]"
                type="date"
                name="startDate"
                placeholder="Buscar Expediente"
              />
              <Label htmlFor="expedientes"> Hasta</Label>
              <Input
                name="endDate"
                className="max-w-[12rem]"
                type="date"
                placeholder="Buscar Expediente"
              />
              <Button>
                <span>
                  <Search />
                </span>
                Buscar
              </Button>
            </Form>
          </Formik>
          <section>
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
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
