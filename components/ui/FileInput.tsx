import { Field, useFormikContext } from "formik";
import React, { useState } from "react";
import { Input } from "./input";
import Swal from "sweetalert2";

const FileInput = React.memo(({ row }: any) => {
  console.log(row);
  const { setFieldValue, values } = useFormikContext<any>();
  const [files, setFiles] = useState<any[]>([]);
  //   console.log(values);
  const ide_rcr = row.original.ide_rcr;
  const nameFile = row.getValue("name");
  console.log(nameFile);

  console.log(ide_rcr);
  const fieldName = `files[${row.index}]`;
  //   console.log(files[0].name);
  console.log(values.files);

  return (
    <Input
      data-ide_rcr={ide_rcr}
      type="file"
      data-idx={row.index}
      accept=".pdf"
      onChange={(event: any) => {
        // enviar data de requisitos modificadas
        // if (event.currentTarget.files.length > 0) {
        //   const selectedFile = event.currentTarget.files[0];
        //   console.log(selectedFile);
        //   const lfiles = [...files];
        //   lfiles.push(event.currentTarget.files[0]);
        //   setFiles(lfiles);
        //   setFieldValue(fieldName, lfiles); // Actualiza el valor del campo en Formik
        // }
        // v2
        const ide_rcr = event.currentTarget.getAttribute("data-ide_rcr");
        const idx = event.currentTarget.getAttribute("data-idx");

        console.log("data-ide_rcr:", ide_rcr);
        console.log("data-idx:", idx);
        ///

        if (event.currentTarget.files.length > 0) {
          console.log(row.original);
          const selectedFile = event.currentTarget.files[0];
          let filesName: string[] = [];
          values.files.forEach((file: File, index: number) => {
            filesName.push(file.name);
          });
          if (filesName.includes(selectedFile.name)) {
            Swal.fire({
              icon: "error",
              title: "Archivo Duplicado",
              text: `El archivo ${selectedFile.name} ya ha sido seleccionado.`,
              footer:
                '<span style="color: green">Porfavor seleccione otro diferente</span>',
            });
          }
          console.log(filesName);
          console.log(selectedFile);

          console.log(selectedFile.name);

          setFieldValue(fieldName, selectedFile);
        }
        // v3
      }}
    />
  );
});
export default FileInput;
