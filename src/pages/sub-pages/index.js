import AllSubPages from "@/components/subPage/AllSubPages";
import { useGetAllSpQuery } from "@/redux/features/subPage/subPageApi";
import React from "react";

const SubPages = () => {
  const { data, isLoading, refetch } = useGetAllSpQuery();
  console.log(data);
  return (
    <div className="mt-[40px] h-full max-h-screen">
      <div className="mt-[50px] overflow-y-auto">
        <div className="mt-[20px]">
          <AllSubPages pages={data?.data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SubPages;
