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
  Slider,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const HSection8 = ({ open, handleOpen, data }) => {
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

  const handleSave = async (data) => {
    const newData = data;
    const formData = new FormData();
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
    setValue("about_our_work.card_1.title", data?.card_1?.title);
    setValue("about_our_work.card_1.summary", data?.card_1?.summary);
    setValue("about_our_work.card_2.title", data?.card_2?.title);
    setValue("about_our_work.card_2.summary", data?.card_2?.summary);
    setValue("about_our_work.card_3.title", data?.card_3?.title);
    setValue("about_our_work.card_3.summary", data?.card_3?.summary);
    setValue("about_our_work.card_4.title", data?.card_4?.title);
    setValue("about_our_work.card_4.summary", data?.card_4?.summary);

    if (data?.solution_1?.title) {
      setValue("about_our_work.solution_1.title", data?.solution_1?.title);
    }
    if (data?.solution_2?.title) {
      setValue("about_our_work.solution_2.title", data?.solution_2?.title);
    }
    if (data?.solution_3?.title) {
      setValue("about_our_work.solution_3.title", data?.solution_3?.title);
    }
    if (data?.solution_4?.title) {
      setValue("about_our_work.solution_4.title", data?.solution_4?.title);
    }
    if (data?.heading) {
      setValue("about_our_work.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("about_our_work.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("about_our_work.heading_summary", data?.heading_summary);
    }

    if (data?.button_title) {
      setValue("about_our_work.button_title", data?.button_title);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 8}
        icon={<Icon id={8} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(8)}
          style={{ backgroundColor: open === 8 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 8 && "translate-x-4"
            }`}
          >
            About Our Work
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white shadow rounded-md p-2 border border-gray-400 hover:border-green-600 hover:shadow-green-600">
                <h1 className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block text-center">
                  Card 1
                </h1>

                <div className="w-full mt-2">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Title
                  </label>

                  <input
                    {...register("about_our_work.card_1.title", {
                      required: true,
                    })}
                    type="text"
                    required
                    placeholder="Enter title"
                    className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                  />
                </div>
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Summary
                  </label>
                  <textarea
                    {...register("about_our_work.card_1.summary", {
                      required: true,
                    })}
                    placeholder="Enter Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white shadow rounded-md p-2 border border-gray-400 hover:border-green-600 hover:shadow-green-600">
                <h1 className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block text-center">
                  Card 2
                </h1>

                <div className="w-full mt-2">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Title
                  </label>
                  <input
                    {...register("about_our_work.card_2.title", {
                      required: true,
                    })}
                    type="text"
                    required
                    placeholder="Enter title"
                    className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                  />
                </div>
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Summary
                  </label>
                  <textarea
                    {...register("about_our_work.card_2.summary", {
                      required: true,
                    })}
                    placeholder="Enter Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white shadow rounded-md p-2 border border-gray-400 hover:border-green-600 hover:shadow-green-600">
                <h1 className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block text-center">
                  Card 3
                </h1>

                <div className="w-full mt-2">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Title
                  </label>
                  <input
                    {...register("about_our_work.card_3.title", {
                      required: true,
                    })}
                    type="text"
                    required
                    placeholder="Enter title"
                    className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                  />
                </div>
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Summary
                  </label>
                  <textarea
                    {...register("about_our_work.card_3.summary", {
                      required: true,
                    })}
                    placeholder="Enter Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white shadow rounded-md p-2 border border-gray-400 hover:border-green-600 hover:shadow-green-600">
                <h1 className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block text-center">
                  Card 4
                </h1>

                <div className="w-full mt-2">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Title
                  </label>
                  <input
                    {...register("about_our_work.card_4.title", {
                      required: true,
                    })}
                    type="text"
                    required
                    placeholder="Enter title"
                    className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                  />
                </div>
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Card Summary
                  </label>
                  <textarea
                    {...register("about_our_work.card_4.summary", {
                      required: true,
                    })}
                    placeholder="Enter Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
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
                {...register("about_our_work.heading", { required: true })}
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
                {...register("about_our_work.sub_heading", {
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
                {...register("about_our_work.heading_summary", {
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
                Button Name
              </label>
              <input
                {...register("about_our_work.button_title", {
                  required: true,
                })}
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

export default HSection8;
