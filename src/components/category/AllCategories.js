import { pages_items } from "@/lib/datas/demo";
import React from "react";
import PageCard from "./CategoryCard";

const AllCategories = ({ categories, isLoading }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {!isLoading &&
        categories?.length > 0 &&
        categories?.map((item, index) => <PageCard key={index} data={item} />)}
    </div>
  );
};

export default AllCategories;
