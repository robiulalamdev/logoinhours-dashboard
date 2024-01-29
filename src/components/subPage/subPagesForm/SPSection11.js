/* eslint-disable @next/next/no-img-element */
import { HOME_SECTION_ANIMATION } from "@/lib/constants/globalConstant";
import { Icon } from "@/lib/services/service";
import { useToggleSpMutation } from "@/redux/features/subPage/subPageApi";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "@material-tailwind/react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const SPSection11 = ({ open, handleOpen, data, id }) => {
  const { colors } = useSelector((state) => state.global);
  const [toggleSp, { isLoading }] = useToggleSpMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSave = async (data) => {
    const newData = data;

    const formData = new FormData();
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
    if (data?.heading) {
      setValue("about_company.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("about_company.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue("about_company.heading_summary", data?.heading_summary);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 11}
        icon={<Icon id={11} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(11)}
          style={{ backgroundColor: open === 11 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 11 && "translate-x-4"
            }`}
          >
            About Company
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Heading
              </label>
              <input
                {...register("about_company.heading", {
                  required: true,
                })}
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
                {...register("about_company.sub_heading", {
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
                {...register("about_company.heading_summary", {
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

export default SPSection11;
