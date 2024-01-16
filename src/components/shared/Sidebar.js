import React from "react";
import SidebarUi from "./SidebarUi";
import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/redux/features/globals/globalsSlice";
import { iClose, iMenu } from "@/lib/icons/icons";

const Sidebar = () => {
  const { isOpen, colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div className="relative">
      <div className="hidden lg:block max-w-[300px] min-w-[300px] w-full h-screen">
        <SidebarUi />
      </div>

      {isOpen && (
        <Drawer
          open={isOpen ? true : false}
          onClose={() => dispatch(setIsOpen(!isOpen))}
          className="p-0"
        >
          <SidebarUi />
        </Drawer>
      )}
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

export default Sidebar;
