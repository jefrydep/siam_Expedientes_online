"use client";
import { setIdeEje } from "@/redux/features";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  Book,
  Cloud,
  CreditCard,
  Github,
  HomeIcon,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const ide_eje = useAppSelector((state) => state.ide_eje.value);
  const router = useRouter();
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
        className={` flex text-white relative flex-col w-full  bg-sidebarbgColor  "
        }`}
      >
        <div
          className={`absolute  text-white bottom-[10vh] right-0  `}
          //   onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {/* <FiChevronRight size={50} style={iconStyle} /> */}
        </div>

        <nav className="mt-20 flex flex-col gap-4   ">
          <Link className=" " href={"/dashboard/home"}>
            <Button
              className="flex px-2 gap-6 w-full  justify-start"
              variant={"ghost"}
            >
              <HomeIcon />

              <span>Inicio</span>
            </Button>
          </Link>
          <Link href={"/dashboard/expe"}>
            <Button
              className="flex px-2 gap-6 w-full  justify-start"
              variant={"ghost"}
            >
              <Book />
              <span>Expedientes</span>
            </Button>
          </Link>

          <hr />
        </nav>
        <div className=" absolute flex gap-4  content-center justify-center items-center  bottom-4 w-full bg-purple-300 p-3">
          <div className="flex flex-col">
            <h4 className="text-sm">Godofredo Palomino</h4>
            <span className="text-xs">Jefrydep@gmail.com</span>
          </div>
          <div className="cursor-pointer">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* <Button variant="outline"> </Button> */}
                  <LogOut
                    className="hover:bg-blue-500"
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
                          // callbackUrl: "/",<
                        });

                        router.push(`/login/${ide_eje}`);

                        setIsLoading(false);
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cerrar Sesión</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
