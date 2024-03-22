/* eslint-disable @next/next/no-img-element */
import useViewImage from "@/lib/hooks/useViewImage";
import { iEdit, trash } from "@/lib/icons/icons";
import { useDeleteCategoryMutation } from "@/redux/features/category/categoryApi";
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const CategoryCard = ({ data, handleUpdate }) => {
  const { viewImg } = useViewImage();
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    const options = {
      id: data?._id,
      data: {},
    };
    const result = await deleteCategory(options);
    if (result?.data?.success) {
      toast.success("Category Remove Success");
    } else {
      toast.error("Category Remove Failed");
    }
  };

  return (
    <div className="grid h-full w-full max-h-[200px] max-w-[28rem] items-end justify-center text-center border relative bg-gray-50">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-3 ">
        <img src={viewImg(data?.image)} alt="" />
        <h1 className="text-black font-bold text-[18px] text-wrap">
          {data?.name}
        </h1>

        <small className="text-gray-800 uppercase text-xs">
          {moment(data?.createdAt).format("MMM DD YYYY")}
        </small>
      </div>
      <div
        onClick={() => handleDelete()}
        className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center border text-red-600 cursor-pointer hover:bg-red-100"
      >
        {trash}
      </div>

      <div
        onClick={() => {
          handleUpdate(data);
        }}
        className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center border text-red-600 cursor-pointer hover:bg-red-100"
      >
        {iEdit}
      </div>
    </div>
  );
};

export default CategoryCard;
