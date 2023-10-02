import Link from "next/link";
import React from "react";
import { FaHome, FaUser } from "react-icons/fa";

const Sidebar = () => {
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
    </section>
  );
};

export default Sidebar;
