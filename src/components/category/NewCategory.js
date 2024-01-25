/* eslint-disable @next/next/no-img-element */
import { iUpload } from "@/lib/icons/icons";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import { Button } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircular, SpinnerCircularFixed } from "spinners-react";

const NewCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
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
    const options = {
      data: formData,
    };
    const result = await createCategory(options);
    if (result?.data?.success) {
      reset();
      toast.success("Category Create Success");
      setImgFile(null);
    } else {
      toast.error("Category Create Failed");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-8 "
      >
        <div className="grid md:grid-cols-2 gap-8 col-span-4">
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
              className={`w-full h-[250px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {imgFile ? (
                <img
                  className="w-full h-full object-contain"
                  src={URL.createObjectURL(imgFile)}
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
              className="w-full h-[250px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
            ></textarea>
          </div>
        </div>
        <div className="col-span-4">
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
            className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
          />
        </div>
        <div className="col-span-4">
          <Button
            type="submit"
            disabled={isLoading}
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
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
