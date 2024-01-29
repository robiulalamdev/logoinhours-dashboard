/* eslint-disable @next/next/no-img-element */
import { HOME_SECTION_ANIMATION } from "@/lib/constants/globalConstant";
import useViewImage from "@/lib/hooks/useViewImage";
import { iUpload, trash } from "@/lib/icons/icons";
import { Icon } from "@/lib/services/service";
import { useToggleSpMutation } from "@/redux/features/subPage/subPageApi";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "@material-tailwind/react";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const SPSection3 = ({ open, handleOpen, data, id }) => {
  const { colors } = useSelector((state) => state.global);
  const { viewImg } = useViewImage();
  const [toggleSp, { isLoading }] = useToggleSpMutation();

  const { handleSubmit, register, setValue } = useForm();

  // stats
  const [image, setImage] = useState(null);

  // refs
  const imageRef = useRef();

  const handleSave = async (data) => {
    const newData = data;
    const formData = new FormData();

    if (image) {
      formData.append(`boost_creativity_image`, image);
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
    if (data?.image) {
      setImage(data?.image);
    }
    if (data?.heading) {
      setValue("boost_creativity.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("boost_creativity.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("boost_creativity.heading_summary", data?.heading_summary);
    }
    if (data?.button_title) {
      setValue("boost_creativity.button_title", data?.button_title);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          style={{ backgroundColor: open === 3 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 3 && "translate-x-4"
            }`}
          >
            Boost Creativity
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="col-span-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                image
              </label>

              <Button
                onClick={() => imageRef.current.click()}
                className={`w-full h-[250px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
              >
                {image ? (
                  <img
                    className="w-full h-full object-contain"
                    src={viewImg(image)}
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
                  ref={imageRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  multiple={false}
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
                {...register("boost_creativity.heading", { required: true })}
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
                {...register("boost_creativity.sub_heading", {
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
                {...register("boost_creativity.heading_summary", {
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
                {...register("boost_creativity.button_title", {
                  required: true,
                })}
                type="text"
                required
                placeholder="Enter Title"
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

export default SPSection3;
