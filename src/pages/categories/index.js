import AllCategories from "@/components/category/AllCategories";
import NewCategory from "@/components/category/NewCategory";
import PagesTab from "@/components/category/CategoryTab";
import Head from "next/head";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";

const CategoryPage = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const { pagesTab, colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  console.log(data);
  return (
    <>
      <Head>
        <title>Category</title>
        <meta name="description" content="categories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-[40px] h-full max-h-screen">
        <PagesTab />
        <div className="mt-[50px] overflow-y-auto">
          <div className="mt-[20px]">
            {pagesTab === 1 && (
              <AllCategories categories={data?.data} isLoading={isLoading} />
            )}
            {pagesTab === 2 && <NewCategory />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
