import { Field, useFormikContext } from "formik";
import React, { useState } from "react";
import { Input } from "./input";
import Swal from "sweetalert2";

const FileInput = React.memo(({ row }: any) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const [files, setFiles] = useState<any[]>([]);
  //   console.log(values);
  const fieldName = `files[${row.index}]`;
  //   console.log(files[0].name);

  return (
    <Input
      type="file"
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
        if (event.currentTarget.files.length > 0) {
          const selectedFile = event.currentTarget.files[0];

          //   const lfiles = [...files];
          //   lfiles.push(event.currentTarget.files[0]);
          //   setFiles(lfiles);
          console.log(selectedFile.name);
          setFieldValue(fieldName, selectedFile);

          //   setFiles([selectedFile]);
        }
        // v3
      }}
    />
  );
});
export default FileInput;
