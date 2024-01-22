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

const HSection4 = ({ open, handleOpen, data }) => {
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
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // refs
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();

  const handleSave = async (data) => {
    const newData = data;
    const formData = new FormData();
    console.log(newData);

    if (image1) {
      formData.append(`stand_out_card_1_icon`, image1);
    }
    if (image2) {
      formData.append(`stand_out_card_2_icon`, image2);
    }
    if (image3) {
      formData.append(`stand_out_card_3_icon`, image3);
    }
    if (image4) {
      formData.append(`stand_out_card_4_icon`, image4);
    }
    formData.append(`newData`, JSON.stringify(newData));
    console.log(data);
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
    if (data?.card_1?.icon) {
      setImage1(data?.card_1?.icon);
      setValue("stand_out.card_1.icon", data?.card_1?.icon);
    }
    if (data?.card_2?.icon) {
      setImage2(data?.card_2?.icon);
      setValue("stand_out.card_2.icon", data?.card_2?.icon);
    }
    if (data?.card_3?.icon) {
      setImage3(data?.card_3?.icon);
      setValue("stand_out.card_3.icon", data?.card_3?.icon);
    }
    if (data?.card_4?.icon) {
      setImage4(data?.card_4?.icon);
      setValue("stand_out.card_4.icon", data?.card_4?.icon);
    }
    if (data?.card_1?.title) {
      setValue("stand_out.card_1.title", data?.card_1?.title);
    }
    if (data?.card_2?.title) {
      setValue("stand_out.card_2.title", data?.card_2?.title);
    }
    if (data?.card_3?.title) {
      setValue("stand_out.card_3.title", data?.card_3?.title);
    }
    if (data?.card_4?.title) {
      setValue("stand_out.card_4.title", data?.card_4?.title);
    }
    if (data?.heading) {
      setValue("stand_out.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("stand_out.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("stand_out.heading_summary", data?.heading_summary);
    }
    if (data?.analytics) {
      setValue("stand_out.analytics", data?.analytics);
    }
    if (data?.development) {
      setValue("stand_out.development", data?.development);
    }
    if (data?.solutions) {
      setValue("stand_out.solutions", data?.solutions);
    }
    if (data?.button_title) {
      setValue("stand_out.button_title", data?.button_title);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 4}
        icon={<Icon id={4} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(4)}
          style={{ backgroundColor: open === 4 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 4 && "translate-x-4"
            }`}
          >
            Stand Out
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Card 1
                </label>

                <Button
                  onClick={() => image1Ref.current.click()}
                  className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
                >
                  {image1 ? (
                    <img
                      className="size-[80px] object-contain"
                      src={viewImg(image1)}
                      alt=""
                    />
                  ) : (
                    <>
                      <div
                        className="max-w-[40px]"
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
                    ref={image1Ref}
                    onChange={(e) => setImage1(e.target.files[0])}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    className="opacity-0 hidden"
                  />
                </Button>
                <input
                  {...register("stand_out.card_1.title", { required: true })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Card 2
                </label>

                <Button
                  onClick={() => image2Ref.current.click()}
                  className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
                >
                  {image2 ? (
                    <img
                      className="size-[80px] object-contain"
                      src={viewImg(image2)}
                      alt=""
                    />
                  ) : (
                    <>
                      <div
                        className="max-w-[40px]"
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
                    ref={image2Ref}
                    onChange={(e) => setImage2(e.target.files[0])}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    className="opacity-0 hidden"
                  />
                </Button>
                <input
                  {...register("stand_out.card_2.title", { required: true })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Card 3
                </label>

                <Button
                  onClick={() => image3Ref.current.click()}
                  className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
                >
                  {image3 ? (
                    <img
                      className="size-[80px] object-contain"
                      src={viewImg(image3)}
                      alt=""
                    />
                  ) : (
                    <>
                      <div
                        className="max-w-[40px]"
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
                    ref={image3Ref}
                    onChange={(e) => setImage3(e.target.files[0])}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    className="opacity-0 hidden"
                  />
                </Button>
                <input
                  {...register("stand_out.card_3.title", { required: true })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Card 4
                </label>

                <Button
                  onClick={() => image4Ref.current.click()}
                  className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
                >
                  {image4 ? (
                    <img
                      className="size-[80px] object-contain"
                      src={viewImg(image4)}
                      alt=""
                    />
                  ) : (
                    <>
                      <div
                        className="max-w-[40px]"
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
                    ref={image4Ref}
                    onChange={(e) => setImage4(e.target.files[0])}
                    type="file"
                    multiple={false}
                    accept=".png, .jpg, .jpeg"
                    className="opacity-0 hidden"
                  />
                </Button>
                <input
                  {...register("stand_out.card_4.title", { required: true })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
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
                {...register("stand_out.heading", { required: true })}
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
                {...register("stand_out.sub_heading", {
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
                {...register("stand_out.heading_summary", {
                  required: true,
                })}
                placeholder="Enter Heading Summary"
                className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
              ></textarea>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 max-w-[400px]">
              <div>
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] flex items-center gap-2 mb-2"
                  htmlFor=""
                >
                  Analytics{" "}
                  <div className="w-9 h-9 bg-blue-600 flex justify-center items-center rounded-full">
                    <span className="text-sm font-semibold text-white">
                      {watch("stand_out.analytics")}
                    </span>
                  </div>
                </label>
                <Controller
                  name="stand_out.analytics"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Slider
                      color="blue"
                      onChange={(e) =>
                        setValue(
                          "stand_out.analytics",
                          parseInt(e.target.value)
                        )
                      }
                      value={watch("stand_out.analytics")}
                    />
                  )}
                />
              </div>
              <div>
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] flex items-center gap-2 mb-2"
                  htmlFor=""
                >
                  Development{" "}
                  <div className="w-9 h-9 bg-green-600 flex justify-center items-center rounded-full">
                    <span className="text-sm font-semibold text-white">
                      {watch("stand_out.development")}
                    </span>
                  </div>
                </label>

                <Controller
                  name="stand_out.development"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Slider
                      color="green"
                      onChange={(e) =>
                        setValue(
                          "stand_out.development",
                          parseInt(e.target.value)
                        )
                      }
                      value={watch("stand_out.development")}
                    />
                  )}
                />
              </div>
              <div>
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] flex items-center gap-2 mb-2"
                  htmlFor=""
                >
                  Solutions{" "}
                  <div className="w-9 h-9 bg-amber-600 flex justify-center items-center rounded-full">
                    <span className="text-sm font-semibold text-white">
                      {watch("stand_out.solutions")}
                    </span>
                  </div>
                </label>
                <Controller
                  name="stand_out.solutions"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Slider
                      color="amber"
                      onChange={(e) =>
                        setValue(
                          "stand_out.solutions",
                          parseInt(e.target.value)
                        )
                      }
                      value={watch("stand_out.solutions")}
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Button Name
              </label>
              <input
                {...register("stand_out.button_title", {
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

export default HSection4;
