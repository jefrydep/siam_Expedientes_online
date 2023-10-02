"use client";
import { setIdeEje } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const ide_eje = useAppSelector((state) => state.ide_eje.value);
  console.log(ide_eje);
  useEffect(() => {
    const storedIdeEje = JSON.parse(localStorage.getItem("ide_eje") ?? "null");

    if (storedIdeEje) {
      dispatch(setIdeEje(storedIdeEje));
    }
  }, [dispatch]);

  return (
    <section className=" flex w-[15rem] h-screen bg-purple-500">
      <div
        className={` flex text-white relative flex-col  bg-sidebarbgColor  "
        }`}
      >
        <div
          className={`absolute  text-white bottom-[10vh] right-0  `}
          //   onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {/* <FiChevronRight size={50} style={iconStyle} /> */}
        </div>

        <nav className="mt-20 flex flex-col gap-4   ">
          <Link
            className="flex pl-3  items-center gap-4 hover:bg-[#C1BBBA] "
            href={"/dashboard"}
          >
            <FaUser size={35} />
            <h3>Admin</h3>
          </Link>

          <hr />

          <Link
            className="flex pl-3  items-center gap-4 hover:bg-[#C1BBBA] "
            href={"/dashboard/home"}
          >
            <FaHome size={35} />
            <h3>home</h3>
          </Link>
        </nav>
      </div>
      {session && (
        <div
          title="Salir"
          className="cursor-pointer  hover    hover:text-red-400 text-white rounded-xl"
          onClick={async () => {
            const result = await Swal.fire({
              title: "¿Cerrar sesión?",
              text: "¿Estás seguro?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#01DFD7",
              cancelButtonColor: "#d33",
              confirmButtonText: "¡Si!, ¡Cerrar!",
              cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
              setIsLoading(true);

              await signOut({
                redirect: false,
                callbackUrl: "/",
              });

              // router.push(`/login/${session.user.}}`);

              setIsLoading(false);
            }
          }}
        >
          <ImExit size={34} />
        </div>
      )}
    </section>
  );
};

export default Sidebar;
