import { Button, Dialog } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";
import { useCreatePageMutation } from "@/redux/features/pages/pagesApi";

const CreatePagePopup = ({ open, close }) => {
  const [createPage, { isLoading: isPageLoading }] = useCreatePageMutation();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const handleSave = async (data) => {
    const options = {
      data: data,
    };
    const result = await createPage(options);
    if (result?.data?.success) {
      toast.success("Data Save Success!");
      reset();
      close(false);
    } else {
      toast.error("Data Save Failed!");
    }
  };

  return (
    <Dialog size="xs" open={open} handler={() => close(false)} className="px-1">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="max-w-[400px] w-full mx-auto bg-white h-fit px-3 py-3 my-5 rounded-md shadow border"
      >
        <div className="mb-4">
          <span className="block tracking-[0.26px] leading-[16px] text-black text-sm mb-1">
            Name
          </span>
          <input
            {...register("name", { required: true })}
            type="text"
            className="w-full h-10 bg-gray-100 outline-none px-2 rounded text-sm"
            placeholder="Enter Page Name"
            required
          />
        </div>

        <div className="mt-5 col-span-4">
          <Button
            type="submit"
            disabled={isPageLoading}
            className="flex justify-center items-center gap-2 max-w-[180px] w-full h-10 shadow-none hover:shadow-none rounded bg-primary"
          >
            {isPageLoading && (
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
    </Dialog>
  );
};

export default CreatePagePopup;
