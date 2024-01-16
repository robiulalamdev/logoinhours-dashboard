import { metas } from "@/lib/metas/metas";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const HSection1 = dynamic(() => import("@/components/Homes/HSection1"), {
  ssr: false,
});

const HSection2 = dynamic(() => import("@/components/Homes/HSection2"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <>
      <Head>
        <title>{metas.home.title}</title>
        <meta name="description" content={metas.home.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-[50px] h-full max-h-screen overflow-y-auto">
        <HSection1 />
        <HSection2 />
      </div>
    </>
  );
};

export default HomePage;
