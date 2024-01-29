/* eslint-disable @next/next/no-img-element */
import { trash } from "@/lib/icons/icons";
import { useDeleteSpMutation } from "@/redux/features/subPage/subPageApi";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const SubPageCard = ({ data }) => {
  const [deleteSp, { isLoading }] = useDeleteSpMutation();

  const handleDelete = async () => {
    const options = {
      id: data?._id,
      data: {},
    };
    const result = await deleteSp(options);
    console.log(result);
    if (result?.data?.success) {
      toast.success("Sub Page Remove Success");
    } else {
      toast.error("Sub Page Remove Failed");
    }
  };

  return (
    <div className="grid w-full h-[150px] max-w-[28rem] items-end justify-center text-center border relative bg-gray-50">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-3 ">
        <Link href={`/sub-pages/${data?._id}`}>
          <h1 className="text-black hover:text-orange-600 font-bold text-[18px] text-wrap">
            {data?.name}
          </h1>
        </Link>
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
    </div>
  );
};

export default SubPageCard;
