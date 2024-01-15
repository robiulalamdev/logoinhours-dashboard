/* eslint-disable @next/next/no-img-element */
import React from "react";
import logo from "../../assets/brand/logo.png";
import Image from "next/image";
import { sidebar_routes } from "@/lib/datas/globalDatas";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";

const SidebarUi = () => {
  const { pathname } = useRouter();
  return (
    <div className="max-w-[350px] min-w-[350px] w-full bg-blue-900 h-full px-4">
      <div className="flex items-center justify-center h-[150px] w-full">
        <Image className="w-[150px]" src={logo} alt="" />
      </div>

      <div className="grid grid-cols-1 gap-[5px] w-full mt-[40px] ">
        {sidebar_routes.map((route, index) => (
          <Link href={`/${route.url}`} key={index}>
            <Button
              className={`w-full flex items-center gap-[14px] h-[47px] p-[16px] rounded-sm shadow-none outline-none
            ${
              pathname.includes(route.url)
                ? "bg-primary text-white font-extrabold"
                : "text-white hover:bg-primary font-[500] bg-transparent"
            }`}
            >
              <div className="w-[23.5px] h-[23.5px] ">{route.icon}</div>
              <span className="text-sm leading-[21px] tracking-[0.2px]">
                {route.name}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarUi;
