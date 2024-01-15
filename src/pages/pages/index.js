import AllPages from "@/components/pages/AllPages";
import NewPage from "@/components/pages/NewPage";
import PagesTab from "@/components/pages/PagesTab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PagesPage = () => {
  const { pagesTab, colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div className="mt-[50px]">
      <PagesTab />
      <div className="mt-[20px]">
        {pagesTab === 1 && <AllPages />}
        {pagesTab === 2 && <NewPage />}
      </div>
    </div>
  );
};

export default PagesPage;
