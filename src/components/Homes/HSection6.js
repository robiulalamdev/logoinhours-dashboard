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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";
import StatusSwitch from "../commons/StatusSwitch";

const HSection6 = ({ open, handleOpen, data, handleUpdate }) => {
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
  const [bgImage, setBgImage] = useState(null);
  const [bgFormImage, setBgFormImage] = useState(null);

  // refs
  const bgImageRef = useRef();
  const bgFormImageRef = useRef();

  const handleSave = async (data) => {
    const newData = data;
    const formData = new FormData();

    if (bgImage) {
      formData.append(`appointment_bg_image`, bgImage);
    }
    if (bgFormImage) {
      formData.append(`appointment_bg_form_image`, bgFormImage);
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

  useMemo(() => {
    if (data?.bg_image) {
      setBgImage(data?.bg_image);
      setValue("appointment.bg_image", data?.bg_image);
    }
    if (data?.bg_form_image) {
      setBgFormImage(data?.bg_form_image);
      setValue("appointment.bg_form_image", data?.bg_form_image);
    }
    if (data?.heading) {
      setValue("appointment.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("appointment.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("appointment.heading_summary", data?.heading_summary);
    }
    if (data?.button_title) {
      setValue("appointment.button_title", data?.button_title);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 6}
        icon={<Icon id={6} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(6)}
          style={{ backgroundColor: open === 6 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 6 && "translate-x-4"
            }`}
          >
            Appointment
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <StatusSwitch
            action={(value) => handleUpdate({ "appointment.status": value })}
            value={data?.status}
          />
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Background Image
                </label>

                <Button
                  onClick={() => bgImageRef.current.click()}
                  className={`w-full h-[250px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
                >
                  {bgImage ? (
                    <img
                      className="w-full h-full object-contain"
                      src={viewImg(bgImage)}
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
                        Upload Logo Image <span>(.png, .jpg, jpeg)</span>
                      </h1>
                    </>
                  )}
                  <input
                    ref={bgImageRef}
                    onChange={(e) => setBgImage(e.target.files[0])}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    className="opacity-0 hidden"
                  />
                </Button>
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Form Background Image
                </label>

                <Button
                  onClick={() => bgFormImageRef.current.click()}
                  className={`w-full h-[250px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
                >
                  {bgFormImage ? (
                    <img
                      className="w-full h-full object-contain"
                      src={viewImg(bgFormImage)}
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
                    ref={bgFormImageRef}
                    onChange={(e) => setBgFormImage(e.target.files[0])}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    className="opacity-0 hidden"
                  />
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Heading
              </label>
              <input
                {...register("appointment.heading", { required: true })}
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
                {...register("appointment.sub_heading", {
                  required: true,
                })}
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
                {...register("appointment.heading_summary", {
                  required: true,
                })}
                placeholder="Enter Heading Summary"
                className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
              ></textarea>
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

export default HSection6;
