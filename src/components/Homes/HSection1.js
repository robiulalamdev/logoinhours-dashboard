/* eslint-disable @next/next/no-img-element */
import { HOME_SECTION_ANIMATION } from "@/lib/constants/globalConstant";
import { editor } from "@/lib/datas/globalDatas";
import useViewImage from "@/lib/hooks/useViewImage";
import { iUpload, trash } from "@/lib/icons/icons";
import { Icon } from "@/lib/services/service";
import { useToggleLandingMutation } from "@/redux/features/home/homeApi";
import { setCustom_logo } from "@/redux/features/home/homeSlice";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";
import StatusSwitch from "../commons/StatusSwitch";

const HSection1 = ({ open, handleOpen, data, handleUpdate }) => {
  const { custom_logo } = useSelector((state) => state.home);
  const { colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { viewImg } = useViewImage();
  const [toggleLanding, { isLoading }] = useToggleLandingMutation();

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
  const [banners, setBanners] = useState([]);

  // refs
  const bannerRef = useRef();

  const handleSave = async (data) => {
    const newData = data;

    const formData = new FormData();

    if (banners?.length > 0) {
      banners.forEach((file) => {
        formData.append(`hero_section_banners`, file);
      });
      newData["hero_section"]["banners"] = banners;
    }
    formData.append(`newData`, JSON.stringify(newData));

    const options = {
      data: formData,
    };
    const result = await toggleLanding(options);
    if (result?.data?.success) {
      toast.success("Data Save Success!");
    } else {
      toast.error("Data Save Failed!");
    }
  };

  const removeImage = (index) => {
    const data = [...banners];
    data.splice(index, 1);
    setBanners(data);
  };

  useMemo(() => {
    if (data?.banners?.length > 0) {
      setBanners(data?.banners);
    }
    if (data?.heading) {
      setValue("hero_section.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("hero_section.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("hero_section.heading_summary", data?.heading_summary);
    }
    if (data?.button_title) {
      setValue("hero_section.button_title", data?.button_title);
    }
  }, [data]);
  // console.log(banners);
  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          style={{ backgroundColor: open === 1 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 1 && "translate-x-4"
            }`}
          >
            Hero Section
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <StatusSwitch
            action={(value) => handleUpdate({ "hero_section.status": value })}
            value={data?.status}
          />
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="col-span-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Banners
              </label>
              {banners?.length > 0 && (
                <div className="flex flex-wrap items-start gap-4 mb-4">
                  {banners?.map((img, index) => (
                    <div
                      key={index}
                      className="size-[150px] relative bg-gray-200"
                    >
                      <img
                        src={viewImg(img)}
                        className="object-contain h-full w-full"
                        alt=""
                      />
                      <div
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 z-40 rounded-full bg-red-600 text-white p-1 w-8 h-8 cursor-pointer flex justify-center items-center"
                      >
                        {trash}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                onClick={() => bannerRef.current.click()}
                className={`w-full h-[180px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
              >
                <>
                  <div
                    className="max-w-[70px]"
                    style={{ color: colors.primary_color }}
                  >
                    {iUpload}
                  </div>
                  <h1 className="text-gray-500 text-sm font-normal !normal-case text-current">
                    Upload Banners Image <span>(.png, .jpg, jpeg)</span>
                  </h1>
                </>
                <input
                  ref={bannerRef}
                  onChange={(e) => setBanners([...banners, ...e.target.files])}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="opacity-0 hidden"
                />
              </Button>
            </div>

            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Heading
              </label>
              <input
                {...register("hero_section.heading", { required: true })}
                type="text"
                required
                placeholder="Enter Heading"
                className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
              />
            </div>
            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Sub Heading
              </label>
              <input
                {...register("hero_section.sub_heading", { required: true })}
                type="text"
                required
                placeholder="Enter Sub Heading"
                className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
              />
            </div>

            <div className="w-full h-full mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Heading Summary
              </label>
              <textarea
                {...register("hero_section.heading_summary", {
                  required: true,
                })}
                placeholder="Enter Heading Summary"
                className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
              ></textarea>
            </div>
            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Button Text
              </label>
              <input
                {...register("hero_section.button_title", { required: true })}
                type="text"
                required
                placeholder="Enter Sub Heading"
                className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
              />
            </div>

            <div className="mt-5">
              <Button
                type="submit"
                className="flex justify-center items-center gap-2 max-w-[180px] w-full h-[48px] shadow-none hover:shadow-none rounded-sm"
                style={{ backgroundColor: colors.primary_color }}
              >
                {isLoading && (
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
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default HSection1;
