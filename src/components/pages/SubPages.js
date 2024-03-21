import { useGetSubPagesByPageIdQuery } from "@/redux/features/subPage/subPageApi";
import React from "react";
import AllSubPages from "../subPage/AllSubPages";

const SubPages = ({ selectedPage }) => {
  const { data, isLoading, refetch } = useGetSubPagesByPageIdQuery(
    selectedPage?._id
  );
  // console.log("sub Pages: ", data);
  return (
    <>
      <AllSubPages selectedPage={selectedPage} subPages={data?.data} />
    </>
  );
};

export default SubPages;
