import SPSection1 from "@/components/subPage/subPagesForm/SPSection1";
import SPSection10 from "@/components/subPage/subPagesForm/SPSection10";
import SPSection11 from "@/components/subPage/subPagesForm/SPSection11";
import SPSection12 from "@/components/subPage/subPagesForm/SPSection12";
import SPSection2 from "@/components/subPage/subPagesForm/SPSection2";
import SPSection3 from "@/components/subPage/subPagesForm/SPSection3";
import SPSection4 from "@/components/subPage/subPagesForm/SPSection4";
import SPSection5 from "@/components/subPage/subPagesForm/SPSection5";
import SPSection6 from "@/components/subPage/subPagesForm/SPSection6";
import SPSection7 from "@/components/subPage/subPagesForm/SPSection7";
import SPSection8 from "@/components/subPage/subPagesForm/SPSection8";
import SPSection9 from "@/components/subPage/subPagesForm/SPSection9";
import {
  useGetSpQuery,
  useUpdateStatusSubPageMutation,
} from "@/redux/features/subPage/subPageApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SubPageDetails = () => {
  const { query } = useRouter();
  const { data, isLoading } = useGetSpQuery(query.id);
  const [updateStatusSubPage] = useUpdateStatusSubPageMutation();
  const [open, setOpen] = useState(0);

  const handleOpen = (input) => {
    if (open === input) {
      setOpen(0);
    } else {
      setOpen(input);
    }
  };
  useEffect(() => {
    console.log(query.id);
  }, [query.id]);

  const handleUpdate = async (id, data) => {
    const options = {
      id: id,
      data: data,
    };
    const result = await updateStatusSubPage(options);
    if (result?.data?.success) {
      toast.success("Status Update Success");
    } else {
      toast.error("Status Update Failed");
    }
  };

  return (
    <div className="mt-[40px] h-full max-h-screen">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="font-bold">Data Loading...</h1>
        </div>
      ) : (
        <>
          {data?.data ? (
            <>
              <div className="mt-[40px] h-full max-h-screen overflow-y-auto">
                {/* <SPSection1
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.hero_section}
                  id={data?.data?._id}
                   handleUpdate={handleUpdate}
                /> */}
                <SPSection2
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.professional_it_services}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                <SPSection3
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.boost_creativity}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                <SPSection4
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.stand_out}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                <SPSection5
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.companies}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                {/* <SPSection6
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.appointment}
                  id={data?.data?._id}
                   handleUpdate={handleUpdate}
                /> */}
                <SPSection7
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.it_solutions}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                <SPSection8
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.about_our_work}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                {/* <SPSection9
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.complete_projects}
                  id={data?.data?._id}
                   handleUpdate={handleUpdate}
                /> */}
                <SPSection10
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.work_process}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                <SPSection11
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.about_company}
                  id={data?.data?._id}
                  handleUpdate={handleUpdate}
                />
                {/* <SPSection12
                  open={open}
                  handleOpen={handleOpen}
                  data={data?.data?.client_reviews}
                  id={data?.data?._id}
                   handleUpdate={handleUpdate}
                /> */}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="font-bold">Data Not Found</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubPageDetails;
