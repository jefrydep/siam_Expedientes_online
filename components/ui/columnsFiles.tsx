"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";
import { Item } from "@/interfaces/FilesResponse";
import { Input } from "./input";
import { Requisito } from "@/interfaces/RouteResponse";
import { Field, useField, useFormikContext } from "formik"; // Importa las funciones de Formik

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

console.log("holadfd");
export const columnsFiles: ColumnDef<Requisito>[] = [
  {
    id: "actions",
    header: "Acciones",
    cell: () => {
      return <Field name="file" as={Input} type="file" accept=".pdf" />;
    },
  },
  {
    accessorKey: "des_doc_pad",
    header: "Tipo Doc",
  },
  {
    accessorKey: "des_doc",
    header: "Descripción",
  },
  {
    accessorKey: "1",
    header: "N° Doc",
  },
  {
    accessorKey: "2",
    header: "Fch.Doc",
  },
  {
    accessorKey: "3",
    header: "Nombre Arch.",
  },
  {
    accessorKey: "4 ",
    header: "Tipo Arch",
  },
  {
    accessorKey: "5 ",
    header: "Cant Pag.",
  },
  {
    accessorKey: "6",
    header: "Peso",
  },

  //   {
  //     id: "actions",
  //     header: "Acciones",
  //     cell: () => {
  //       return <Button> hi</Button>;
  //     },
  //   },
];