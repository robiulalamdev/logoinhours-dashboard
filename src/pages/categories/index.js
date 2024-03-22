import AllCategories from "@/components/category/AllCategories";
import NewCategory from "@/components/category/NewCategory";
import PagesTab from "@/components/category/CategoryTab";
import Head from "next/head";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";

const CategoryPage = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const { pagesTab, colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);

  const handleUpdate = (cate) => {
    setOpen(true);
    setCategory(cate);
  };

  return (
    <>
      <Head>
        <title>Category</title>
        <meta name="description" content="categories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-[40px] h-full max-h-screen">
        <AllCategories
          categories={data?.data}
          isLoading={isLoading}
          open={open}
          setOpen={setOpen}
          handleUpdate={handleUpdate}
        />
      </div>

      <NewCategory
        open={open}
        close={setOpen}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
};

export default CategoryPage;
