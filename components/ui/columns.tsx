"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";
import { Item } from "@/interfaces/FilesResponse";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "nom_eje",
    header: "Nombre de la entidad",
  },
  {
    accessorKey: "des_doc",
    header: "Tipo de documento",
  },
  {
    accessorKey: "asu_nto",
    header: "Asunto",
  },
  {
    accessorKey: "fch_reg_txt",
    header: "Fecha de petición",
  },
  {
    accessorKey: "ide_exp",
    header: "N° Expediente",
  },
  {
    accessorKey: "fch_cer",
    header: "Fch. Petición sin efecto",
  },

  {
    id: "actions",
    header: "Acciones",
    cell: () => {
      return <Button> hi</Button>;
    },
  },
];
