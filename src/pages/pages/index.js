import CreatePagePopup from "@/components/pages/CreatePagePopup";
import SubPages from "@/components/pages/SubPages";
import { iEdit, trash } from "@/lib/icons/icons";
import {
  useDeletePageMutation,
  useGetPagesQuery,
  useUpdatePageMutation,
} from "@/redux/features/pages/pagesApi";
import { Button, Dialog } from "@material-tailwind/react";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

const Pages = () => {
  const { data, isLoading, refetch } = useGetPagesQuery();
  const [deletePage] = useDeletePageMutation();
  const [updatePage, { isLoading: isUpdatePageLoading }] =
    useUpdatePageMutation();

  const [pages, setPages] = useState([]);
  const [subPages, setSubPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectUpdatePage, setSelectUpdatePage] = useState(null);
  const [open, setOpen] = useState(false);

  const { handleSubmit, register, setValue } = useForm();

  useMemo(() => {
    if (data?.data?.length > 0) {
      setPages(data?.data);
    }
  }, [data]);

  const searchPage = async (value) => {
    if (value) {
      const result = data?.data?.filter((pg) =>
        pg?.name.toLowerCase().includes(value.toLowerCase())
      );
      setPages(result);
    } else {
      setPages(data?.data);
    }
  };

  const handleDelete = async (id) => {
    const options = {
      id: id,
      data: {},
    };
    const result = await deletePage(options);
    if (result?.data?.success) {
      toast.success("Page Remove Success");
    } else {
      toast.error("Page Remove Failed");
    }
  };

  const handleUpdatePage = async (data) => {
    const options = {
      id: selectUpdatePage?._id,
      data: data,
    };
    const result = await updatePage(options);
    if (result?.data?.success) {
      toast.success("Page Update Success");
    } else {
      toast.error("Page Update Failed");
    }
    setSelectUpdatePage(null);
  };
  return (
    <>
      <div className="h-full max-h-screen">
        {!selectedPage && (
          <div className="py-3 flex items-center gap-4">
            <input
              onChange={(e) => searchPage(e.target.value)}
              type="search"
              className="w-full max-w-[400px] h-10 outline-none border border-gray-400 rounded bg-gray-50 px-2 text-sm 
                text-black placeholder:text-blue-gray-800 placeholder:text-sm"
              placeholder="Search Pages"
            />
            <button
              onClick={() => setOpen(true)}
              className="shadow-none hover:shadow-none rounded bg-orange-700 text-current min-w-[90px] h-10 text-white text-sm p-0"
            >
              New Page
            </button>
          </div>
        )}

        <div className="mt-[50px] overflow-y-auto">
          {selectedPage ? (
            <>
              <SubPages selectedPage={selectedPage} />
            </>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {pages?.map((page, index) => (
                <div
                  key={index}
                  className="w-full h-[120px] bg-blue-gray-50 shadow shadow-gray-500 flex flex-col justify-center items-center gap-2 relative"
                >
                  <h1 className="font-semibold text-black break-words">
                    {page?.name}
                  </h1>

                  <button
                    onClick={() => setSelectedPage(page)}
                    className="shadow-none hover:shadow-none rounded bg-orange-700 text-current min-w-[100px] h-8 text-white text-xs p-0"
                  >
                    Go Details
                  </button>

                  <div
                    onClick={() => handleDelete(page?._id)}
                    className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center border text-red-600 cursor-pointer hover:bg-red-100"
                  >
                    {trash}
                  </div>
                  <div
                    onClick={() => {
                      setSelectUpdatePage(page);
                      setValue("name", page?.name);
                    }}
                    className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center border text-red-600 cursor-pointer hover:bg-red-100"
                  >
                    {iEdit}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreatePagePopup open={open} close={setOpen} />

      <Dialog
        size="xs"
        open={!!selectUpdatePage}
        handler={() => setSelectUpdatePage(null)}
        className="px-1"
      >
        <form
          onSubmit={handleSubmit(handleUpdatePage)}
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
              disabled={isUpdatePageLoading}
              className="flex justify-center items-center gap-2 max-w-[180px] w-full h-10 shadow-none hover:shadow-none rounded bg-primary"
            >
              {isUpdatePageLoading && (
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
    </>
  );
};

export default Pages;
