/* eslint-disable @next/next/no-img-element */
import useViewImage from "@/lib/hooks/useViewImage";
import { Rating } from "@material-tailwind/react";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const AllReviews = ({ reviews, isLoading, setTab }) => {
  const { viewImg } = useViewImage();
  const { colors } = useSelector((state) => state.global);
  return (
    <div>
      <table className="table-auto w-full">
        <thead
          className="h-10 text-white"
          style={{
            backgroundColor: colors.primary_color,
          }}
        >
          <tr className="text-left">
            <th className="pl-2 max-w-fit">No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Company</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {!isLoading &&
            reviews?.map((review, index) => (
              <tr key={index} className="border-b border-gray-700 h-[60px]">
                <td className="max-w-fit min-w-[35px] h-full">
                  <h1 className="pl-2 font-bold">{index + 1}</h1>
                </td>
                <td>
                  <img
                    className="w-[40px] h-[40px] rounded-full object-cover"
                    src={viewImg(review?.image)}
                    alt=""
                  />
                </td>
                <td>{review?.name}</td>
                <td>{review?.company}</td>
                <td>
                  <Rating value={parseInt(review?.rating)} readonly />
                </td>
                <td>{moment(review?.createdAt).format("MMM DD YYYY")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {reviews?.length < 1 && !isLoading && (
        <div className="flex justify-center items-center mt-20 font-bold">
          <h1>Data Not Found</h1>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
