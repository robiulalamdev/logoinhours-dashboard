import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, setColor, button }) => {
  return (
    <Popover>
      <PopoverHandler>{button}</PopoverHandler>
      <PopoverContent className="rounded p-0">
        <SketchPicker color={color} onChangeComplete={(e) => setColor(e)} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
