/* eslint-disable @next/next/no-img-element */
import { Button } from "@material-tailwind/react";
import React, { useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ColorPicker from "../commons/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { setColors, setLogo } from "@/redux/features/globals/globalsSlice";
import { iUpload } from "@/lib/icons/icons";
import { SpinnerCircularFixed } from "spinners-react";
import {
  useGetGlobalQuery,
  useToggleGlobalMutation,
} from "@/redux/features/globals/globalApi";
import { toast } from "sonner";
import useViewImage from "@/lib/hooks/useViewImage";

const InitialPage = () => {
  const [toggleGlobal, { isLoading }] = useToggleGlobalMutation();
  const { data } = useGetGlobalQuery();
  const { colors, logo } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const { viewImg } = useViewImage();

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  // refs
  const logoRef = useRef();

  const handleSave = async (data) => {
    const newData = data;

    const formData = new FormData();
    if (logo && typeof logo === "object") {
      formData.append("logo", logo);
    }
    formData.append(`newData`, JSON.stringify(newData));

    const options = {
      data: formData,
    };
    const result = await toggleGlobal(options);
    if (result?.data?.success) {
      toast.success("Data Save Success!");
    } else {
      toast.error("Data Save Failed!");
    }
  };

  useMemo(() => {
    if (data?.data?.colors) {
      dispatch(setColors(data?.data?.colors));
    }
    if (data?.data?.logo) {
      dispatch(setLogo(data?.data?.logo));
    }
    if (data?.data?.colors?.primary_color) {
      setValue("colors.primary_color", data?.data?.colors?.primary_color);
    } else {
      setValue("colors.primary_color", colors?.primary_color);
    }
    if (data?.data?.colors?.background_color) {
      setValue("colors.background_color", data?.data?.colors?.background_color);
    } else {
      setValue("colors.background_color", colors?.background_color);
    }
    if (data?.data?.colors?.secondary_color) {
      setValue("colors.secondary_color", data?.data?.colors?.secondary_color);
    } else {
      setValue("colors.secondary_color", colors?.secondary_color);
    }

    if (data?.data?.contact_header?.email) {
      setValue("contact_header.email", data?.data?.contact_header?.email);
    }
    if (data?.data?.contact_header?.phone) {
      setValue("contact_header.phone", data?.data?.contact_header?.phone);
    }
    if (data?.data?.contact_header?.address) {
      setValue("contact_header.address", data?.data?.contact_header?.address);
    }
    if (data?.data?.contact_header?.schedule) {
      setValue("contact_header.schedule", data?.data?.contact_header?.schedule);
    }
    if (data?.data?.contact_header?.facebook) {
      setValue("contact_header.facebook", data?.data?.contact_header?.facebook);
    }
    if (data?.data?.contact_header?.twitter) {
      setValue("contact_header.twitter", data?.data?.contact_header?.twitter);
    }
    if (data?.data?.contact_header?.instagram) {
      setValue(
        "contact_header.instagram",
        data?.data?.contact_header?.instagram
      );
    }
    if (data?.data?.contact_header?.linkedin) {
      setValue("contact_header.linkedin", data?.data?.contact_header?.linkedin);
    }
  }, [data]);

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-end gap-8 mt-[20px] pb-8"
      >
        <div className="col-span-4  gap-4">
          <div>
            <label
              className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
              htmlFor=""
            >
              Logo
            </label>
            <Button
              onClick={() => logoRef.current.click()}
              className={`w-full h-[200px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
            >
              {logo ? (
                <img
                  className="w-full h-full object-contain"
                  src={viewImg(logo)}
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
                ref={logoRef}
                onChange={(e) => dispatch(setLogo(e.target.files[0]))}
                type="file"
                multiple={false}
                accept=".png, .jpg, .jpeg"
                className="opacity-0 hidden"
              />
            </Button>
          </div>
        </div>
        <div className="col-span-4">
          <label
            className="text-xs sm:text-sm md:text-xl font-semibold leading-[26px] block"
            htmlFor=""
          >
            Header Information
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Email
                </label>
                <input
                  {...register("contact_header.email", {
                    required: true,
                  })}
                  type="email"
                  required
                  placeholder="Enter Email"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Phone
                </label>
                <input
                  {...register("contact_header.phone", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter Phone Number"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Address
                </label>
                <input
                  {...register("contact_header.address", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter Address"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Schedule
                </label>
                <input
                  {...register("contact_header.schedule", {
                    required: true,
                  })}
                  type="text"
                  required
                  placeholder="Enter schedule time"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Facebook
                </label>
                <input
                  {...register("contact_header.facebook", {
                    required: true,
                  })}
                  type="url"
                  required
                  placeholder="Enter facebook url"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Twitter
                </label>
                <input
                  {...register("contact_header.twitter", {
                    required: true,
                  })}
                  type="url"
                  required
                  placeholder="Enter twitter url"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Instagram
                </label>
                <input
                  {...register("contact_header.instagram", {
                    required: true,
                  })}
                  type="url"
                  required
                  placeholder="Enter instagram url"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
              <div className="">
                <label
                  className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
                  htmlFor=""
                >
                  Linkedin
                </label>
                <input
                  {...register("contact_header.linkedin", {
                    required: true,
                  })}
                  type="url"
                  required
                  placeholder="Enter linkedin url"
                  className="w-full h-[42px] outline-none border border-black px-2 rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-1">
          <label
            className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
            htmlFor=""
          >
            Primary Color
          </label>
          <Controller
            name="colors.primary_color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                button={
                  <Button
                    className={`w-full h-[100px] rounded shadow-none border-2 hover:shadow-none`}
                    style={{ backgroundColor: colors.primary_color }}
                  >
                    {colors.primary_color}
                  </Button>
                }
                setColor={(color) => {
                  setValue("colors.primary_color", color?.hex);
                  dispatch(setColors({ ...colors, primary_color: color.hex }));
                }}
                color={watch("colors.primary_color")}
              />
            )}
          />
        </div>
        <div className="col-span-4 sm:col-span-1">
          <label
            className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
            htmlFor=""
          >
            Background Color
          </label>
          <Controller
            name="colors.background_color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                button={
                  <Button
                    className={`w-full h-[100px] rounded shadow-none border-2 hover:shadow-none`}
                    style={{ backgroundColor: colors.background_color }}
                  >
                    {colors.background_color}
                  </Button>
                }
                setColor={(color) => {
                  setValue("colors.background_color", color?.hex);
                  dispatch(
                    setColors({ ...colors, background_color: color.hex })
                  );
                }}
                color={"#2d0dcc"}
              />
            )}
          />
        </div>
        <div className="col-span-4 sm:col-span-1">
          <label
            className="text-xs sm:text-sm md:text-base font-semibold leading-[26px] block"
            htmlFor=""
          >
            Secondary Color
          </label>
          <Controller
            name="colors.secondary_color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                button={
                  <Button
                    className={`w-full h-[100px] rounded shadow-none border-2 hover:shadow-none`}
                    style={{ backgroundColor: colors.secondary_color }}
                  >
                    {colors.secondary_color}
                  </Button>
                }
                setColor={(color) => {
                  setValue("colors.secondary_color", color?.hex);
                  dispatch(
                    setColors({ ...colors, secondary_color: color.hex })
                  );
                }}
                color={watch("colors.secondary_color")}
              />
            )}
          />
        </div>
        <div className="mt-5 col-span-4">
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
    </div>
  );
};

export default InitialPage;
