/* eslint-disable @next/next/no-img-element */
import StatusSwitch from "@/components/commons/StatusSwitch";
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

const SPSection10 = ({ open, handleOpen, data, id, handleUpdate }) => {
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
      formData.append(`work_process_icon_1`, image1);
    }
    if (image2) {
      formData.append(`work_process_icon_2`, image2);
    }
    if (image3) {
      formData.append(`work_process_icon_3`, image3);
    }
    if (image4) {
      formData.append(`work_process_icon_4`, image4);
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
    if (data?.process_1?.icon) {
      setImage1(data?.process_1?.icon);
      setValue("work_process.process_1.icon", data?.process_1?.icon);
    }
    if (data?.process_2?.icon) {
      setImage2(data?.process_2?.icon);
      setValue("work_process.process_2.icon", data?.process_2?.icon);
    }
    if (data?.process_3?.icon) {
      setImage3(data?.process_3?.icon);
      setValue("work_process.process_3.icon", data?.process_3?.icon);
    }
    if (data?.process_4?.icon) {
      setImage4(data?.process_4?.icon);
      setValue("work_process.process_4.icon", data?.process_4?.icon);
    }

    setValue("work_process.process_1.title", data?.process_1?.title);
    setValue("work_process.process_1.summary", data?.process_1?.summary);
    setValue("work_process.process_2.title", data?.process_2?.title);
    setValue("work_process.process_2.summary", data?.process_2?.summary);
    setValue("work_process.process_3.title", data?.process_3?.title);
    setValue("work_process.process_3.summary", data?.process_3?.summary);
    setValue("work_process.process_4.title", data?.process_4?.title);
    setValue("work_process.process_4.summary", data?.process_4?.summary);

    if (data?.process_1?.title) {
      setValue("work_process.process_1.title", data?.process_1?.title);
    }
    if (data?.process_2?.title) {
      setValue("work_process.process_2.title", data?.process_2?.title);
    }
    if (data?.process_3?.title) {
      setValue("work_process.process_3.title", data?.process_3?.title);
    }
    if (data?.process_4?.title) {
      setValue("work_process.process_4.title", data?.process_4?.title);
    }
    if (data?.heading) {
      setValue("work_process.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("work_process.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("work_process.heading_summary", data?.heading_summary);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 10}
        icon={<Icon id={10} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(10)}
          style={{ backgroundColor: open === 10 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 10 && "translate-x-4"
            }`}
          >
            Work Process
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <StatusSwitch
            action={(value) =>
              handleUpdate(id, { "work_process.status": value })
            }
            value={data?.status}
          />
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Process 1
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
                  {...register("work_process.process_1.title", {
                    required: false,
                  })}
                  type="text"
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Process Summary
                  </label>
                  <textarea
                    {...register("work_process.process_1.summary", {
                      required: false,
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
                  Process 2
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
                  {...register("work_process.process_2.title", {
                    required: false,
                  })}
                  type="text"
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Process Summary
                  </label>
                  <textarea
                    {...register("work_process.process_2.summary", {
                      required: false,
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
                  Process 3
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
                  {...register("work_process.process_3.title", {
                    required: false,
                  })}
                  type="text"
                  placeholder="Enter title"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm mt-2"
                />
                <div className="w-full h-full mt-4">
                  <label
                    className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                    htmlFor=""
                  >
                    Process Summary
                  </label>
                  <textarea
                    {...register("work_process.process_3.summary", {
                      required: false,
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
                  Process 4
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
                  {...register("work_process.process_4.title", {
                    required: false,
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
                    Process Summary
                  </label>
                  <textarea
                    {...register("work_process.process_4.summary", {
                      required: false,
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
                {...register("work_process.heading", { required: true })}
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
                {...register("work_process.sub_heading", {
                  required: false,
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
                {...register("work_process.heading_summary", {
                  required: false,
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

export default SPSection10;
