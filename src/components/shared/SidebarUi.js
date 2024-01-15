/* eslint-disable @next/next/no-img-element */
import React from "react";
import logo from "../../assets/brand/logo.png";
import Image from "next/image";
import { sidebar_routes } from "@/lib/datas/globalDatas";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { iClose, iMenu } from "@/lib/icons/icons";
import { setIsOpen } from "@/redux/features/globals/globalsSlice";

const SidebarUi = () => {
  const { isOpen, colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  return (
    <div className="max-w-[300px] min-w-[300px] w-full bg-blue-900 h-full px-4 relative">
      <div className="flex items-center justify-center h-[150px] w-full">
        <Link href="/">
          <Image className="w-[150px]" src={logo} alt="" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-[5px] w-full mt-[40px] ">
        {sidebar_routes.map((route, index) => (
          <Link href={`/${route.url}`} key={index}>
            <Button
              className={`hover:shadow-none w-full flex items-center gap-[14px] h-[47px] p-[16px] rounded-sm shadow-none outline-none
            ${
              pathname.includes(route.url)
                ? " text-white font-extrabold"
                : `text-white hover:bg-primary font-[500] bg-transparent`
            }`}
              style={{
                backgroundColor:
                  pathname.includes(route.url) && colors.primary_color,
              }}
            >
              <div className="w-[23.5px] h-[23.5px] ">{route.icon}</div>
              <span className="text-sm leading-[21px] tracking-[0.2px]">
                {route.name}
              </span>
            </Button>
          </Link>
        ))}
      </div>

      <div
        onClick={() => dispatch(setIsOpen(!isOpen))}
        className={`w-[40px] h-[40px] text-white absolute top-3 -right-14 cursor-pointer flex justify-center items-center rounded`}
        style={{ backgroundColor: colors.primary_color }}
      >
        {isOpen ? iClose : iMenu}
      </div>
    </div>
  );
};

export default SidebarUi;
