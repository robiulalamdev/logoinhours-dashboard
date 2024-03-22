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
import StatusSwitch from "../commons/StatusSwitch";

const HSection5 = ({ open, handleOpen, data, handleUpdate }) => {
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
    if (!data?.companies) {
      newData["companies"] = {};
    }
    const formData = new FormData();

    if (image1) {
      formData.append(`companies_image_1`, image1);
    }
    if (image2) {
      formData.append(`companies_image_2`, image2);
    }
    if (image3) {
      formData.append(`companies_image_3`, image3);
    }
    if (image4) {
      formData.append(`companies_image_4`, image4);
    }
    formData.append(`newData`, JSON.stringify(data));
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
    if (data?.image_1) {
      setImage1(data?.image_1);
      setValue("companies.image_1", data?.image_1);
    }
    if (data?.image_2) {
      setImage2(data?.image_2);
      setValue("companies.image_2", data?.image_2);
    }
    if (data?.image_3) {
      setImage3(data?.image_3);
      setValue("companies.image_3", data?.image_3);
    }
    if (data?.image_4) {
      setImage4(data?.image_4);
      setValue("companies.image_4", data?.image_4);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 5}
        icon={<Icon id={5} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(5)}
          style={{ backgroundColor: open === 5 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 5 && "translate-x-4"
            }`}
          >
            Companies
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <StatusSwitch
            action={(value) => handleUpdate({ "companies.status": value })}
            value={data?.status}
          />
          <form
            onSubmit={handleSubmit(handleSave)}
            className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <Button
              onClick={() => image1Ref.current.click()}
              className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {image1 ? (
                <img
                  className="max-w-[150px] object-contain"
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
            <Button
              onClick={() => image2Ref.current.click()}
              className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {image2 ? (
                <img
                  className="max-w-[150px] object-contain"
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
            <Button
              onClick={() => image3Ref.current.click()}
              className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {image3 ? (
                <img
                  className="max-w-[150px] object-contain"
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
            <Button
              onClick={() => image4Ref.current.click()}
              className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {image4 ? (
                <img
                  className="max-w-[150px] object-contain"
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

export default HSection5;
