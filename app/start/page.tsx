import useAxios from "@/components/hooks/useAxios";
import Loader from "@/components/loader/Loader";
import CustomButton from "@/components/ui/CustomButton";
import CustomMolal from "@/components/ui/CustomModal";
import { CompanyResponse } from "@/interfaces/CompanyResponse";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const StartPage = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/18`;
  const { data, error, loading } = useAxios<CompanyResponse[]>(API_URL);
  const [companies, setCompanies] = useState<CompanyResponse[] | null>(data);
  const router = useRouter();
  console.log(error);
  useEffect(() => {
    setCompanies(data);
  }, [data]);
  // console.log(data);
  interface PropsSearch {
    nameCompany: string;
  }
  if (loading) {
    return <Loader />;
  }
  const handleSelectCompany = (ide_eje: number) => {
    router.push(`login/${ide_eje}`);
  };
  const handleSearchComapanie = ({ nameCompany }: PropsSearch) => {
    const dataFiltered = data?.filter((data) =>
      (data.nom_eje + " " + data.ruc_eje)
        .toLowerCase()
        .includes(nameCompany.toLowerCase())
    );
    setCompanies(dataFiltered || data);
  };
  return (
    <CustomMolal isOpen={true}>
      <div className="bg-gray-100 rounded-lg w-[80rem] px-4  h-[95vh] overflow-scroll">
        <h4 className="text-center mt-3 text-black font-bold mb-4">
          Seleccione una entidad ejecutora
        </h4>

        <label htmlFor="">Buscar: RUC/EJECUTORA</label>
        <input
          className=" block w-full mb-3 rounded-3xl border borderInput    focus:border-second focus:outline-none focus:ring-1 focus:ring-second py-1 px-3 text-gray-500"
          type="text"
          onChange={(e) => {
            handleSearchComapanie({ nameCompany: e.target.value });
          }}
        />
        {data &&
          companies?.map((company) => (
            <section key={company.ide_eje} className="px-2 py-1 ">
              <div className="grid grid-cols-3 border md:grid-cols-9    bg-white shadow-md rounded-lg  center items-center px-3 py-3 md:py-1   justify-between    gap-5">
                <div className=" ">
                  <Image
                    alt={company.nom_eje}
                    src={`http://www.documentosvirtuales.com:3006/ppto/ejecutora/${company.ide_eje}/${company.pat_img}`}
                    width={35}
                    height={35}
                    priority
                  />
                </div>
                <span className="col-span-2 text-xs">
                  Ruc:{company.ruc_eje}
                </span>
                <span className="col-span-3 text-xs text-center font-bold ">
                  {company.nom_eje}
                </span>
                <div className="col-span-3 text-xs">
                  <CustomButton
                    onClick={() => handleSelectCompany(company.ide_eje)}
                    nameButton={"Seleccionar"}
                    color={"bgButton"}
                  />
                </div>
              </div>
            </section>
          ))}
      </div>
    </CustomMolal>
  );
};

export default StartPage;
