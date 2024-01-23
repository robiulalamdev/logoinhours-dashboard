import { metas } from "@/lib/metas/metas";
import { useGetHomeQuery } from "@/redux/features/home/homeApi";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";

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
  const [open, setOpen] = useState(0);

  const handleOpen = (input) => {
    if (open === input) {
      setOpen(0);
    } else {
      setOpen(input);
    }
  };

  console.log(data);
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
        />
        <HSection2
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.professional_it_services}
        />
        <HSection3
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.boost_creativity}
        />
        <HSection4
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.stand_out}
        />
        <HSection5
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.companies}
        />
        <HSection6
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.appointment}
        />
        <HSection7
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.it_solutions}
        />
        <HSection8
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.about_our_work}
        />
        <HSection9
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.complete_projects}
        />
        <HSection10
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.work_process}
        />
        <HSection11
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.about_company}
        />
        <HSection12
          open={open}
          handleOpen={handleOpen}
          data={data?.data?.client_reviews}
        />
      </div>
    </>
  );
};

export default HomePage;
