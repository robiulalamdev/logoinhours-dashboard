import { metas } from "@/lib/metas/metas";
import Head from "next/head";
import React from "react";

export const metadata = metas.home;

const HomePage = () => {
  return (
    <>
      <Head>
        <title>{metas.home.title}</title>
        <meta name="description" content={metas.home.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default HomePage;
