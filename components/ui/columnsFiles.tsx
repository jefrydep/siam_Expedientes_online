"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";
import { Item } from "@/interfaces/FilesResponse";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsFiles: ColumnDef<Item>[] = [
  {
    accessorKey: "nom_eje",
    header: "Acc.",
  },
  {
    accessorKey: "des_doc",
    header: "Tipo Doc",
  },
  {
    accessorKey: "asu_nto",
    header: "Descripción",
  },
  {
    accessorKey: "fch_reg_txt",
    header: "N° Doc",
  },
  {
    accessorKey: "ide_exp",
    header: "Fch.Doc",
  },
  {
    accessorKey: "fch_cer",
    header: "Nombre Arch.",
  },
  {
    accessorKey: "fccer",
    header: "Tipo Arch",
  },
  {
    accessorKey: "fer",
    header: "Cant Pag.",
  },
  {
    accessorKey: "fch",
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
