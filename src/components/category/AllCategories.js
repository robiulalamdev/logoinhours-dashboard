import { pages_items } from "@/lib/datas/demo";
import React from "react";
import PageCard from "./CategoryCard";

const AllCategories = ({
  categories,
  isLoading,
  setOpen,
  open,
  handleUpdate,
}) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        onClick={() => setOpen(!open)}
        className="h-full w-full max-h-[200px] max-w-[28rem] flex flex-col items-center justify-center gap-4 text-center border relative bg-primary cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>

        <h1 className="text-white font-bold">Add Category</h1>
      </div>
      {!isLoading &&
        categories?.length > 0 &&
        categories?.map((item, index) => (
          <PageCard key={index} data={item} handleUpdate={handleUpdate} />
        ))}
    </div>
  );
};

export default AllCategories;
