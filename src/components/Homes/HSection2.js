/* eslint-disable @next/next/no-img-element */
import { editor } from "@/lib/datas/globalDatas";
import { iUpload } from "@/lib/icons/icons";
import { setCustom_logo } from "@/redux/features/home/homeSlice";
import { Button } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";

const HSection2 = () => {
  const { custom_logo } = useSelector((state) => state.home);
  const { colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    setFocus,
    watch,
    control,
    formState: { errors },
  } = useForm();

  // stats
  const [imgFile, setImgFile] = useState(null);

  // refs
  const custom_logoRef = useRef();
  const imgRef = useRef();
  return (
    <div>
      <h1 className="text-xl font-bold uppercase leading-[26px] block text-center">
        Hero Section
      </h1>
      <form className="mt-4 max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          <Button
            //   hero_section.custom_logo.img
            onClick={() => custom_logoRef.current.click()}
            className="bg-primary_gw border border-dashed border-black rounded w-[100px] h-[70px] shadow-none hover:shadow-none"
          >
            {custom_logo ? (
              <img
                className="w-full h-full object-contain"
                src={URL.createObjectURL(custom_logo)}
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
              </>
            )}
            <input
              ref={custom_logoRef}
              onChange={(e) => dispatch(setCustom_logo(e.target.files[0]))}
              type="file"
              multiple={false}
              accept=".png, .jpg, .jpeg"
              className="opacity-0 hidden"
            />
          </Button>
          <input
            {...register("hero_section.custom_logo.title", { required: true })}
            type="text"
            required
            placeholder="Enter Page Name"
            defaultValue="Custom Logo Design"
            className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
          />
        </div>
        <div className="mt-4">
          <label
            className="text-xs sm:text-sm md:text-base font-semibold uppercase leading-[26px] block"
            htmlFor=""
          >
            Title
          </label>
          <input
            {...register("hero_section.title", { required: true })}
            type="text"
            required
            placeholder="Enter Title"
            defaultValue="Top-Notch Custom Logo Design in Houston for Nationwide Branding"
            className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
          />
        </div>
        <div className="w-full h-full mt-4">
          <label
            className="text-xs sm:text-sm md:text-base font-bold uppercase leading-[26px] block"
            htmlFor=""
          >
            Description
          </label>
          <textarea
            {...register("hero_section.description", { required: true })}
            placeholder="Enter short description"
            defaultValue="A great logo is essential for any business or brand. At Logo In Hours LLC, we specialize in helping you discover the best logo-designing company in Houston and beyond. Our top-tier designers ensure you find the perfect match for your nationwide branding needs. "
            className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
          ></textarea>
        </div>
        <div className="w-full h-full mt-4">
          <label
            className="text-xs sm:text-sm md:text-base font-bold uppercase leading-[26px] block"
            htmlFor=""
          >
            Short Content
          </label>
          <Button
            // hero_section.img
            onClick={() => imgRef.current.click()}
            className={`max-w-[250px] w-full mx-auto mb-2 h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
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
          <Controller
            name="hero_section.short_content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                style={{ minHeight: "400px" }}
                value={watch("hero_section.short_content")}
                placeholder="Write here...."
                onChange={(newContent) =>
                  setValue("hero_section.short_content", newContent)
                }
                modules={editor.modules}
                formats={editor.formats}
                className="placeholder:text-[#D9DBDF] text-xl"
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default HSection2;
