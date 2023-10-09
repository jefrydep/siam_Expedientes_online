"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./button";
import { Item } from "@/interfaces/FilesResponse";
import { Input } from "./input";
import { Requisito } from "@/interfaces/RouteResponse";
import { Field, FieldArray, useField, useFormikContext } from "formik"; // Importa las funciones de Formik

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

console.log("holadfd");
export const columnsFiles: ColumnDef<Requisito>[] = [
  {
    id: "actions",
    // header: "Acciones",
    cell: ({row}) => {
      const requisito = row.original
      console.log(requisito)
      // console.log(row)
      const { setFieldValue, values } = useFormikContext();

      const fieldName = `files${row}`; // Asigna un nombre de campo único

      // console.log(values);
      return (
        <Field
          // name={fieldName}
          multiple
          name={`files${requisito.ide_doc}`}
          as={Input}
          type="file"
          accept=".pdf"
          onChange={(event: any) => {
            // Actualiza el valor del campo de archivo en el estado
            setFieldValue(`files[${row}]`, event.currentTarget.files[0]);
            console.log(event);

            // setFieldValue("files", event.currentTarget.files[1]);
          }}
        />
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
        // />
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
