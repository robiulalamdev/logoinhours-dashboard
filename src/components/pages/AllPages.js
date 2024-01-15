import { pages_items } from "@/lib/datas/demo";
import React from "react";
import PageCard from "./PageCard";

const AllPages = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pages_items.map((item, index) => (
        <PageCard key={index} data={item} />
      ))}
    </div>
  );
};

export default AllPages;
