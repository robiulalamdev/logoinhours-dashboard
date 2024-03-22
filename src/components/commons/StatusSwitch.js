import { Switch } from "@material-tailwind/react";
import React from "react";

const StatusSwitch = ({ action, value }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="font-bold">Status : </h1>
        <Switch onClick={() => action(!value)} checked={value} />
      </div>
    </>
  );
};

export default StatusSwitch;
