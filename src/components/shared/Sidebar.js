import React from "react";
import SidebarUi from "./SidebarUi";
import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/redux/features/globals/globalsSlice";

const Sidebar = () => {
  const { isOpen } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <>
      <div className="hidden md:block max-w-[350px] min-w-[350px] w-full h-screen">
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
    </>
  );
};

export default Sidebar;
