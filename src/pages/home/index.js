import { metas } from "@/lib/metas/metas";
import {
  useGetHomeQuery,
  useUpdateLandingSectionStatusMutation,
} from "@/redux/features/home/homeApi";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import { toast } from "sonner";

const HSection1 = dynamic(() => import("@/components/Homes/HSection1"), {
  ssr: false,
});
const HSection2 = dynamic(() => import("@/components/Homes/HSection2"), {
  ssr: false,
});
const HSection3 = dynamic(() => import("@/components/Homes/HSection3"), {
  ssr: false,
});
const HSection4 = dynamic(() => import("@/components/Homes/HSection4"), {
  ssr: false,
});
const HSection5 = dynamic(() => import("@/components/Homes/HSection5"), {
  ssr: false,
});
const HSection6 = dynamic(() => import("@/components/Homes/HSection6"), {
  ssr: false,
});
const HSection7 = dynamic(() => import("@/components/Homes/HSection7"), {
  ssr: false,
});
const HSection8 = dynamic(() => import("@/components/Homes/HSection8"), {
  ssr: false,
});
const HSection9 = dynamic(() => import("@/components/Homes/HSection9"), {
  ssr: false,
});
const HSection10 = dynamic(() => import("@/components/Homes/HSection10"), {
  ssr: false,
});
const HSection11 = dynamic(() => import("@/components/Homes/HSection11"), {
  ssr: false,
});
const HSection12 = dynamic(() => import("@/components/Homes/HSection12"), {
  ssr: false,
});

const HomePage = () => {
  const { data } = useGetHomeQuery();
  const [updateLandingSectionStatus] = useUpdateLandingSectionStatusMutation();
  const [open, setOpen] = useState(0);

  const handleOpen = (input) => {
    if (open === input) {
      setOpen(0);
    } else {
      setOpen(input);
    }
  };

  const handleUpdate = async (updateData) => {
    const options = {
      id: data?.data?._id,
      data: updateData,
    };
    const result = await updateLandingSectionStatus(options);
    if (result?.data?.success) {
      toast.success("Status Update Success");
    } else {
      toast.error("Status Update Failed");
    }
  };

  return (
    <>
      <Head>
        <title>{metas.home.title}</title>
        <meta name="description" content={metas.home.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-[40px] h-full max-h-screen overflow-y-auto">
        <HSection1
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.hero_section}
          handleUpdate={handleUpdate}
        />
        <HSection2
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.professional_it_services}
          handleUpdate={handleUpdate}
        />
        <HSection3
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.boost_creativity}
          handleUpdate={handleUpdate}
        />
        <HSection4
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.stand_out}
          handleUpdate={handleUpdate}
        />
        <HSection5
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.companies}
          handleUpdate={handleUpdate}
        />
        <HSection6
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.appointment}
          handleUpdate={handleUpdate}
        />
        <HSection7
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.it_solutions}
          handleUpdate={handleUpdate}
        />
        <HSection8
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.about_our_work}
          handleUpdate={handleUpdate}
        />
        <HSection9
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.complete_projects}
          handleUpdate={handleUpdate}
        />
        <HSection10
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.work_process}
          handleUpdate={handleUpdate}
        />
        <HSection11
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.about_company}
          handleUpdate={handleUpdate}
        />
        <HSection12
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.client_reviews}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default HomePage;
