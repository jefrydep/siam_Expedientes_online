"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";
import { Item } from "@/interfaces/FilesResponse";
import { Input } from "./input";
import { Requisito } from "@/interfaces/RouteResponse";
import { Field, FieldArray, useField, useFormikContext } from "formik"; // Importa las funciones de Formik
import { useState } from "react";
import FileInput from "./FileInput";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

console.log("holadfd");
export const columnsFiles: ColumnDef<Requisito>[] = [
  {
    id: "actions",
    // header: "Acciones",
    cell: ({ row }) => {
      // console.log(ide_rcr);
      // console.log(requisito);
      // console.log(row);
      // const { setFieldValue, values } = useFormikContext();
      // const [files, setFiles] = useState<any[]>([]);
      // console.log(files);
      // const fieldName = `files${row}`; // Asigna un nombre de campo único
      // const fieldName = `files[${row.index}]`; // Use an array for the field name

      // console.log(values);
      return (
        <FileInput row={row} />
        // <input
        //   type="file"
        //   accept=".pdf"
        //   // data-ide_rcr={req.ide_rcr}
        //   // data-idx={idx}
        //   onChange={(event: any) => {
        //     console.log(
        //       event.currentTarget["data-ide_rcr"],
        //       event.currentTarget
        //     );
        //     console.log(event.currentTarget.files[0]);
        //     if (event.currentTarget.files.length > 0) {
        //       const lfiles = [...files];
        //       lfiles.push(event.currentTarget.files[0]);
        //       setFiles(lfiles);
        //       console.log(lfiles.length);
        //     }
        //   }}
        // <FieldArray
        //   name="filesArray"
        //   render={(arrayHelpers) => (
        //     <div>
        //       {values.filesArray.map((_, index) => (
        //         <div key={index}>
        //           <Field
        //             name={`filesArray[${index}]`}
        //             type="file"
        //             accept=".pdf"
        //             onChange={(event:any) => {
        //               const file = event.currentTarget.files[0];
        //               arrayHelpers.replace(index, file);
        //             }}
        //           />
        //         </div>
        //       ))}
        //     </div>
        //   )}
      );
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
    accessorKey: "name",
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
