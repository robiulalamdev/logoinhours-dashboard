/* eslint-disable @next/next/no-img-element */
import { iEdit, trash } from "@/lib/icons/icons";
import {
  useDeleteSpMutation,
  useUpdateSubPageMutation,
} from "@/redux/features/subPage/subPageApi";
import { Button, Dialog } from "@material-tailwind/react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const SubPageCard = ({ data }) => {
  const [deleteSp, { isLoading }] = useDeleteSpMutation();
  const [updateSubPage, { isLoading: updateLoading }] =
    useUpdateSubPageMutation();

  const [selectUpdatePage, setSelectUpdatePage] = useState(null);
  const { handleSubmit, register, setValue } = useForm();

  const handleDelete = async () => {
    const options = {
      id: data?._id,
      data: {},
    };
    const result = await deleteSp(options);
    if (result?.data?.success) {
      toast.success("Sub Page Remove Success");
    } else {
      toast.error("Sub Page Remove Failed");
    }
  };

  const handleUpdatePage = async (data) => {
    const options = {
      id: selectUpdatePage?._id,
      data: data,
    };
    const result = await updateSubPage(options);
    if (result?.data?.success) {
      toast.success("Page Update Success");
    } else {
      toast.error("Page Update Failed");
    }
    setSelectUpdatePage(null);
  };

  return (
    <>
      <div className="grid w-full h-[150px] max-w-[28rem] items-end justify-center text-center border relative bg-gray-50">
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-3 ">
          <Link href={`/pages/${data?._id}`}>
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

        <div
          onClick={() => {
            setSelectUpdatePage(data);
            setValue("name", data?.name);
          }}
          className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center border text-red-600 cursor-pointer hover:bg-red-100"
        >
          {iEdit}
        </div>
      </div>

      <Dialog
        size="xs"
        open={!!selectUpdatePage}
        handler={() => setSelectUpdatePage(null)}
        className="px-1"
      >
        <form
          onSubmit={handleSubmit(handleUpdatePage)}
          className="max-w-[400px] w-full mx-auto bg-white h-fit px-3 py-3 my-5 rounded-md shadow border"
        >
          <div className="mb-4">
            <span className="block tracking-[0.26px] leading-[16px] text-black text-sm mb-1">
              Name
            </span>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-full h-10 bg-gray-100 outline-none px-2 rounded text-sm"
              placeholder="Enter Page Name"
              required
            />
          </div>

          <div className="mt-5 col-span-4">
            <Button
              type="submit"
              disabled={updateLoading}
              className="flex justify-center items-center gap-2 max-w-[180px] w-full h-10 shadow-none hover:shadow-none rounded bg-primary"
            >
              {updateLoading && (
                <SpinnerCircularFixed
                  size={25}
                  thickness={150}
                  speed={450}
                  color="white"
                  secondaryColor="gray"
                />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default SubPageCard;
