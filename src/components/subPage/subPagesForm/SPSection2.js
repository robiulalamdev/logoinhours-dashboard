/* eslint-disable @next/next/no-img-element */
import StatusSwitch from "@/components/commons/StatusSwitch";
import { HOME_SECTION_ANIMATION } from "@/lib/constants/globalConstant";
import { Icon } from "@/lib/services/service";
import { useToggleSpMutation } from "@/redux/features/subPage/subPageApi";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Switch,
} from "@material-tailwind/react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const SPSection2 = ({ open, handleOpen, data, id, handleUpdate }) => {
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
      setValue("professional_it_services.heading", data?.heading);
    }
    if (data?.sub_heading) {
      setValue("professional_it_services.sub_heading", data?.sub_heading);
    }
    if (data?.heading_summary) {
      setValue(
        "professional_it_services.heading_summary",
        data?.heading_summary
      );
    }
    if (data?.button_title) {
      setValue("professional_it_services.button_title", data?.button_title);
    }
  }, [data]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <Accordion
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        animate={HOME_SECTION_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          style={{ backgroundColor: open === 2 && colors.primary_color }}
          className={``}
        >
          <h1
            className={`text-xl font-bold uppercase leading-[26px] block duration-150 ease-in-out ${
              open === 2 && "translate-x-4"
            }`}
          >
            Professional It Services
          </h1>
        </AccordionHeader>
        <AccordionBody>
          <StatusSwitch
            action={(value) =>
              handleUpdate(id, { "professional_it_services.status": value })
            }
            value={data?.status}
          />
          <form onSubmit={handleSubmit(handleSave)} className="w-full">
            <div className="mt-4">
              <label
                className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                htmlFor=""
              >
                Heading
              </label>
              <input
                {...register("professional_it_services.heading", {
                  required: false,
                })}
                type="text"
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
                {...register("professional_it_services.sub_heading", {
                  required: false,
                })}
                type="text"
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
                {...register("professional_it_services.heading_summary", {
                  required: false,
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
                {...register("professional_it_services.button_title", {
                  required: false,
                })}
                type="text"
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

export default SPSection2;
