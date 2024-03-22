/* eslint-disable @next/next/no-img-element */
import useViewImage from "@/lib/hooks/useViewImage";
import { iUpload } from "@/lib/icons/icons";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { setPagesTab } from "@/redux/features/globals/globalsSlice";
import { Button, Dialog } from "@material-tailwind/react";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircular, SpinnerCircularFixed } from "spinners-react";

const NewCategory = ({ open, close, category, setCategory }) => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const { colors } = useSelector((state) => state.global);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    setFocus,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { viewImg } = useViewImage();

  const dispatch = useDispatch();

  console.log(category?.image);

  useMemo(() => {
    if (category && open) {
      setValue("name", category?.name);
      setValue("description", category?.description);
    }
  }, [category]);

  const handleSave = async (data) => {
    const formData = new FormData();

    if (imgFile) {
      formData.append("image", imgFile);
    }
    if (data?.name) {
      formData.append("name", data?.name);
    }
    if (data?.description) {
      formData.append("description", data?.description);
    }

    if (category?._id) {
      const options = {
        id: category?._id,
        data: formData,
      };
      const result = await updateCategory(options);
      if (result?.data?.success) {
        toast.success("Category Update Success");
        setImgFile(null);
        setCategory(null);
        close(false);
      } else {
        toast.error("Category Update Failed");
      }
    } else {
      const options = {
        data: formData,
      };
      const result = await createCategory(options);
      if (result?.data?.success) {
        close(false);
        reset();
        toast.success("Category Create Success");
        setImgFile(null);
        setCategory(null);
      } else {
        toast.error("Category Create Failed");
      }
    }
  };
  return (
    <Dialog
      size="md"
      open={!!open}
      handler={() => close(false)}
      className="bg-white"
    >
      <form
        onSubmit={handleSubmit(handleSave)}
        className="grid grid-cols-1 items-start gap-2 p-2 w-full max-w-[500px] mx-auto"
      >
        <div className="grid grid-cols-1 gap-8">
          <div className="">
            <label
              className="text-xs sm:text-sm md:text-base font-bold uppercase leading-[26px] block"
              htmlFor=""
            >
              Image
            </label>
            <Button
              type="button"
              onClick={() => imgRef.current.click()}
              className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {imgFile || category?.image ? (
                <img
                  className="w-full h-full object-contain"
                  src={viewImg(imgFile || category?.image)}
                  alt=""
                />
              ) : (
                <>
                  <div
                    className="max-w-[100px]"
                    style={{ color: colors.primary_color }}
                  >
                    {iUpload}
                  </div>
                  <h1 className="text-gray-500 text-sm font-normal !normal-case text-current">
                    Upload Image file <span>(.png, .jpg, jpeg)</span>
                  </h1>
                </>
              )}
              <input
                ref={imgRef}
                onChange={(e) => setImgFile(e.target.files[0])}
                type="file"
                multiple={false}
                accept=".png, .jpg, .jpeg"
                className="opacity-0 hidden"
              />
            </Button>
          </div>
          <div className="w-full h-full">
            <label
              className="text-xs sm:text-sm md:text-base font-bold uppercase leading-[26px] block"
              htmlFor=""
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter Description"
              className="w-full h-[100px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
            ></textarea>
          </div>
        </div>
        <div className="">
          <label
            className="text-xs sm:text-sm md:text-base font-bold uppercase leading-[26px] block"
            htmlFor=""
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            required
            placeholder="Enter Page Name"
            className="w-full h-[38px] outline-none border border-black px-2 rounded text-sm"
          />
        </div>
        <div className="">
          <Button
            type="submit"
            disabled={isLoading || updateLoading}
            className="flex justify-center items-center gap-2 max-w-[180px] w-full h-[48px] shadow-none hover:shadow-none rounded-sm"
            style={{ backgroundColor: colors.primary_color }}
          >
            {isLoading && (
              <SpinnerCircularFixed
                size={30}
                thickness={150}
                speed={450}
                color="white"
                secondaryColor="gray"
              />
            )}
            {updateLoading && (
              <SpinnerCircularFixed
                size={30}
                thickness={150}
                speed={450}
                color="white"
                secondaryColor="gray"
              />
            )}
            {category?._id ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default NewCategory;
