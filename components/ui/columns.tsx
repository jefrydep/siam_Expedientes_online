"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  age: number;
  name: string;
  lastName: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Nombre de la entidad",
  },
  {
    accessorKey: "lastName",
    header: "Tipo de documento",
  },
  {
    accessorKey: "age",
    header: "Asunto",
  },
  {
    accessorKey: "age",
    header: "Fecha de petición",
  },
  {
    accessorKey: "age",
    header: "N° Expediente",
  },
  {
    accessorKey: "age",
    header: "Fch. Petición sin efecto",
  },

  {
    id: "actions",
    header: "Acciones",
    // cell: () => {
    //   return <Button> hi</Button>;
    // },
  },
];
