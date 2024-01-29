import { pages_items } from "@/lib/datas/demo";
import React from "react";
import SubPageCard from "./SubPageCard";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSpInitializeMutation } from "@/redux/features/subPage/subPageApi";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const AllSubPages = ({ pages, isLoading }) => {
  const [spInitialize, { isLoading: initLoading }] = useSpInitializeMutation();
  const { handleSubmit, register, reset } = useForm();
  const { colors } = useSelector((state) => state.global);

  const handleCreate = async (data) => {
    const options = {
      data: data,
    };
    const result = await spInitialize(options);
    console.log(result);
    if (result?.data?.success) {
      reset();
      toast.success("Sub Page Create Success");
    } else {
      toast.error("Sub Page Create Failed");
    }
  };
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <form
        onSubmit={handleSubmit(handleCreate)}
        className="col-span-2 h-full w-full max-h-[200px] items-end justify-center text-center px-2 py-3 border relative bg-gray-100"
      >
        <div className="w-full h-full">
          <div>
            <h1 className="text-black font-bold text-[14px] text-left">Name</h1>
            <input
              {...register("name", { required: true })}
              required
              className="w-full h-12 rounded bg-white border border-black px-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded mt-2 flex justify-center items-center gap-3"
            style={{ backgroundColor: colors.primary_color }}
          >
            {initLoading && (
              <SpinnerCircularFixed
                size={30}
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
      {!isLoading &&
        pages?.length > 0 &&
        pages?.map((item, index) => <SubPageCard key={index} data={item} />)}
    </div>
  );
};

export default AllSubPages;
