/* eslint-disable @next/next/no-img-element */
import { HOME_SECTION_ANIMATION } from "@/lib/constants/globalConstant";
import { editor } from "@/lib/datas/globalDatas";
import useViewImage from "@/lib/hooks/useViewImage";
import { iUpload, trash } from "@/lib/icons/icons";
import { Icon } from "@/lib/services/service";
import { useToggleSpMutation } from "@/redux/features/subPage/subPageApi";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Slider,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const SPSection7 = ({ open, handleOpen, data, id }) => {
  const { colors } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { viewImg } = useViewImage();
  const [toggleSp, { isLoading }] = useToggleSpMutation();

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

    if (image1) {
      formData.append(`it_solution_icon_1`, image1);
    }
    if (image2) {
      formData.append(`it_solution_icon_2`, image2);
    }
    if (image3) {
      formData.append(`it_solution_icon_3`, image3);
    }
    if (image4) {
      formData.append(`it_solution_icon_4`, image4);
    }
    formData.append(`newData`, JSON.stringify(newData));

    const options = {
      data: formData,
      id: id,
    };
    const result = await toggleSp(options);
    if (result?.data?.success) {
      toast.success("Data Save Success!");
    } else {
      toast.error("Data Save Failed!");
    }
  };

  useMemo(() => {
    if (data?.solution_1?.icon) {
      setImage1(data?.solution_1?.icon);
      setValue("it_solutions.solution_1.icon", data?.solution_1?.icon);
    }
    if (data?.solution_2?.icon) {
      setImage2(data?.solution_2?.icon);
      setValue("it_solutions.solution_2.icon", data?.solution_2?.icon);
    }
    if (data?.solution_3?.icon) {
      setImage3(data?.solution_3?.icon);
      setValue("it_solutions.solution_3.icon", data?.solution_3?.icon);
    }
    if (data?.solution_4?.icon) {
      setImage4(data?.solution_4?.icon);
      setValue("it_solutions.solution_4.icon", data?.solution_4?.icon);
    }

    setValue("it_solutions.solution_1.title", data?.solution_1?.title);
    setValue("it_solutions.solution_1.summary", data?.solution_1?.summary);
    setValue("it_solutions.solution_2.title", data?.solution_2?.title);
    setValue("it_solutions.solution_2.summary", data?.solution_2?.summary);
    setValue("it_solutions.solution_3.title", data?.solution_3?.title);
    setValue("it_solutions.solution_3.summary", data?.solution_3?.summary);
    setValue("it_solutions.solution_4.title", data?.solution_4?.title);
    setValue("it_solutions.solution_4.summary", data?.solution_4?.summary);

    if (data?.solution_1?.title) {
      setValue("it_solutions.solution_1.title", data?.solution_1?.title);
    }
    if (data?.solution_2?.title) {
      setValue("it_solutions.solution_2.title", data?.solution_2?.title);
    }
    if (data?.solution_3?.title) {
      setValue("it_solutions.solution_3.title", data?.solution_3?.title);
    }
    if (data?.solution_4?.title) {
      setValue("it_solutions.solution_4.title", data?.solution_4?.title);
    }
    if (data?.heading) {
      setValue("it_solutions.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("it_solutions.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("it_solutions.heading_summary", data?.heading_summary);
    }

    if (data?.button_title) {
      setValue("it_solutions.button_title", data?.button_title);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 7}
        icon={<Icon id={7} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(7)}
          style={{ backgroundColor: open === 7 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 7 && "translate-x-4"
            }`}
          >
            It Solutions
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
                  Solution 1
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
                        Upload Image file <span>(.png, .jpg, jpeg)</span>
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
                  {...register("it_solutions.solution_1.title", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Solution Summary
                  </label>
                  <textarea
                    {...register("it_solutions.solution_1.summary", {
                      required: true,
                    })}
                    placeholder="Enter Heading Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Solution 2
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
                        Upload Image file <span>(.png, .jpg, jpeg)</span>
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
                  {...register("it_solutions.solution_2.title", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Solution Summary
                  </label>
                  <textarea
                    {...register("it_solutions.solution_2.summary", {
                      required: true,
                    })}
                    placeholder="Enter Heading Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Solution 3
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
                        Upload Image file <span>(.png, .jpg, jpeg)</span>
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
                  {...register("it_solutions.solution_3.title", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Solution Summary
                  </label>
                  <textarea
                    {...register("it_solutions.solution_3.summary", {
                      required: true,
                    })}
                    placeholder="Enter Heading Summary"
                    className="w-full max-h-[180px] outline-none border border-black px-3 py-3 rounded text-sm resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Solution 4
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
                        Upload Image file <span>(.png, .jpg, jpeg)</span>
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
                  {...register("it_solutions.solution_4.title", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Solution Summary
                  </label>
                  <textarea
                    {...register("it_solutions.solution_4.summary", {
                      required: true,
                    })}
                    placeholder="Enter Heading Summary"
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
                {...register("it_solutions.heading", { required: true })}
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
                {...register("it_solutions.sub_heading", {
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
                {...register("it_solutions.heading_summary", {
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
                {...register("it_solutions.button_title", {
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

export default SPSection7;
