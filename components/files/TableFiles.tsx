// import React from "react";
// import { Input } from "../ui/input";
// import { Field } from "formik";
// import { Requisito } from "@/interfaces/RouteResponse";

// const TableFiles = ({
//   ide_rcr,
//   ide_doc,
//   abr_doc,
//   des_doc,
//   des_doc_pad,
//   fil_idx,
// }: Requisito) => {
//   return (
//     <div>
//       <div className="w-full grid grid-cols-9">
//         <input
//           type="file"
//           accept=".pdf"
//           data-ide_rcr={req.ide_rcr}
//           data-idx={idx}
//           onChange={(event: any) => {
//             const ide_rcr = event.currentTarget.getAttribute("data-ide_rcr");
//             const idx = event.currentTarget.getAttribute("data-idx");

//             if (event.currentTarget.files.length > 0) {
//               const selectedFile = event.currentTarget.files[0];
//               const lfiles = [...files];
//               selectedFile.name;
//               let idx = lfiles.findIndex(
//                 (file) => file.name === selectedFile.name
//               );
//               if (idx >= 0) {
//                 let idx = requirements.findIndex(
//                   (file) => file.ide_rcr === selectedFile.ide_rcr
//                 );
//                 if (idx >= 0) {
//                   let lrequirements = [...requirements];
//                   lrequirements[idx].fil_idx = idx;
//                   setRequirements(lrequirements);
//                 }
//               } else idx = lfiles.push(selectedFile) - 1;

//               console.log("index", idx, lfiles.length);
//               setFiles(lfiles);

//               // Crear un nuevo arreglo de requisitos actualizado con nombre y peso del archivo
//               // const updatedRequirements =
//               //   requirements.map(
//               //     (req, reqIdx) => {
//               //       if (reqIdx === Number(idx)) {
//               //         // Cuando idx coincide con el índice del requisito
//               //         return {
//               //           ...req,
//               //           name: selectedFile.name,
//               //           size: selectedFile.size,
//               //         };
//               //       }
//               //       return req;
//               //     }
//               //   );

//               // setRequirements(
//               //   updatedRequirements
//               // );
//             }
//           }}
//         />
//         <div></div>
//         <div>{des_doc_pad}</div>
//         <div>{des_doc}</div>
//         <div>N° Doc</div>
//         <div>Fch.Doc</div>
//         <div>Nombre Arch.</div>
//         <div>Tipo Arch.</div>
//         <div>Cant Pag.</div>
//         <div>Peso</div>
//       </div>
//     </div>
//   );
// };

// export default TableFiles;
