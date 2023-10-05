"use client";
import { columnsFiles } from "@/components/ui/columnsFiles";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

const UploadPage = () => {
  const [formDataTemp, setFormDataTemp] = useState([]);
  const [filesData, setFilesData] = useState([]);
  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");

    if (storedFormData) {
      setFormDataTemp(JSON.parse(storedFormData));
    }
  }, []);
  console.log(formDataTemp);
  return (
    <div className="w-full">
      <section className="px-2">
        <h4 className="font-bold mt-2 mb-4">
          Adjuntar archivos en formato PDF
        </h4>
        <div>
          <DataTable columns={columnsFiles} data={filesData} />
        </div>
      </section>
    </div>
  );
};

export default UploadPage;
