import React from "react";
import { Input } from "../ui/input";
import { Field } from "formik";

const TableFiles = () => {
  return (
    <div>
      <div>
        {" "}
        <Field name="file" as={Input} type="file" accept=".pdf" />
      </div>
    </div>
  );
};

export default TableFiles;
