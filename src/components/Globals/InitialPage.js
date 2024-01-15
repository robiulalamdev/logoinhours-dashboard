/* eslint-disable @next/next/no-img-element */
import { Button } from "@material-tailwind/react";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ColorPicker from "../commons/ColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { setColors, setLogo } from "@/redux/features/globals/globalsSlice";
import { iUpload } from "@/lib/icons/icons";

const InitialPage = () => {
  const { colors, logo } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  // refs
  const logoRef = useRef();

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const handleSave = async (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <form
        onSubmit={() => handleSubmit(handleSave)}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-end gap-8 mt-[120px]"
      >
        <div className="col-span-4">
          <label
            className="text-xs sm:text-sm md:text-base font-medium uppercase leading-[26px] block"
            htmlFor=""
          >
            Logo
          </label>
          <Button
            onClick={() => logoRef.current.click()}
            className={`w-full h-[250px] rounded shadow-none border-2 hover:shadow-none bg-primary_gw flex flex-col justify-center gap-4 items-center`}
          >
            {logo ? (
              <img
                className="w-full h-full object-contain"
                src={URL.createObjectURL(logo)}
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
        <div>
          <label
            className="text-xs sm:text-sm md:text-base font-medium uppercase leading-[26px] block"
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
                    className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none`}
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
        <div>
          <label
            className="text-xs sm:text-sm md:text-base font-medium uppercase leading-[26px] block"
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
                    className={`w-full h-[150px] rounded shadow-none border-2 hover:shadow-none`}
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
                color={watch("colors.background_color")}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default InitialPage;
