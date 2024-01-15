/* eslint-disable @next/next/no-img-element */
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const PageCard = ({ data }) => {
  const { colors } = useSelector((state) => state.global);
  const img =
    "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065783.jpg?w=1380&t=st=1705347924~exp=1705348524~hmac=28be0e8a4b63eee891655a87b1d26885665800e0e6b798f0c55687d0542b8a29";
  return (
    <div className="relative grid h-full w-full max-h-[200px] max-w-[28rem] items-end justify-center overflow-hidden text-center border">
      <img className="w-full h-full" src={img} alt="" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-t from-gray-900/75 to-pink-500/50 !bg-opacity-15 flex flex-col justify-center items-center gap-4">
        <h1 className="text-white text-[18px] text-wrap">{data?.name}</h1>
        <div className="flex items-center gap-4">
          <Link href="https://www.logoinhours.com/" target="_blank">
            <Button
              size="sm"
              className="shadow-none hover:shadow-none rounded-sm text-white"
              style={{ backgroundColor: colors.primary_color }}
            >
              View
            </Button>
          </Link>
          <Link href={`/pages/${data?._id}`}>
            <Button
              size="sm"
              className="shadow-none hover:shadow-none rounded-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              Edit
            </Button>
          </Link>
        </div>
        <small className="text-gray-300 uppercase text-xs">
          {data?.createdAt}
        </small>
      </div>
    </div>
  );
};

export default PageCard;
