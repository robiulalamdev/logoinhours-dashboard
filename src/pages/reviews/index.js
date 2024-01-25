import AddReview from "@/components/review/AddReview";
import AllReviews from "@/components/review/AllReviews";
import { reviewTabs } from "@/lib/datas/globalDatas";
import { useGetReviewsQuery } from "@/redux/features/globals/globalApi";
import { Button } from "@material-tailwind/react";
import Head from "next/head";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ReviewsPage = () => {
  const { data, isLoading } = useGetReviewsQuery();
  const { colors } = useSelector((state) => state.global);
  const [tab, setTab] = useState(1);

  return (
    <>
      <Head>
        <title>Reviews</title>
        <meta name="description" content="Reviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-[40px] h-full max-h-screen">
        <div className="grid grid-cols-2 h-12 w-full">
          {reviewTabs.map((tab, index) => (
            <Button
              onClick={() => setTab(tab.id)}
              className={`h-full w-full text-white shadow-none hover:shadow-none rounded-sm `}
              style={{
                backgroundColor:
                  tab.id === tab ? colors.primary_color : "#039be5",
              }}
              key={index}
            >
              {tab?.name}
            </Button>
          ))}
        </div>
        <div className="mt-[20px] overflow-y-auto">
          <div className="mt-[20px]">
            {tab === 1 && (
              <AllReviews
                reviews={data?.data}
                isLoading={isLoading}
                setTab={setTab}
              />
            )}
            {tab === 2 && <AddReview setTab={setTab} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
