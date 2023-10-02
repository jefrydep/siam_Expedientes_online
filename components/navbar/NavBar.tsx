"use client";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { ImExit } from "react-icons/im";
const NavBar = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const datar = getSession();
  console.log(datar);

  return (
    <nav className="navBar h-16 sticky top-0">
      <div className="container m-auto">
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
      </div>
    </nav>
  );
};

export default NavBar;
