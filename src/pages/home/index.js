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
        {/* <HSection2 /> */}
      </div>
    </>
  );
};

export default HomePage;
