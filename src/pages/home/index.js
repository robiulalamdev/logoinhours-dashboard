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
      </div>
    </>
  );
};

export default HomePage;
