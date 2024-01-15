import { pagesTabs } from "@/lib/datas/globalDatas";
import { setPagesTab } from "@/redux/features/globals/globalsSlice";
import { Button } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PagesTab = () => {
  const { pagesTab, colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="grid grid-cols-2 h-12 w-full">
        {pagesTabs.map((tab, index) => (
          <Button
            onClick={() => dispatch(setPagesTab(tab.id))}
            className={`h-full w-full text-white shadow-none hover:shadow-none rounded-sm `}
            style={{
              backgroundColor:
                tab.id === pagesTab ? colors.primary_color : "#039be5",
            }}
            key={index}
          >
            {tab?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PagesTab;
