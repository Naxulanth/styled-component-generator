import Option from "containers/Option";
import OptionColor from "containers/OptionColor";
import OptionSelect from "containers/OptionSelect";
import { borderStyle, outlineStyle, clearStyle } from "constants/options";

export const attributes = [
  { label: "border-left-width", value: "border-left-width", type: Option },
  {
    label: "border-left-style",
    value: "border-left-style",
    type: OptionSelect,
    option: borderStyle
  },
  { label: "border-left-color", value: "border-left-color", type: OptionColor },
  { label: "border-right-width", value: "border-right-width", type: Option },
  {
    label: "border-right-style",
    value: "border-right-style",
    type: OptionSelect,
    option: borderStyle
  },
  {
    label: "border-right-color",
    value: "border-right-color",
    type: OptionColor
  },
  { label: "border-top-width", value: "border-top-width", type: Option },
  {
    label: "border-top-style",
    value: "border-top-style",
    type: OptionSelect,
    option: borderStyle
  },
  { label: "border-top-color", value: "border-top-color", type: OptionColor },
  { label: "border-bottom-width", value: "border-bottom-width", type: Option },
  {
    label: "border-bottom-style",
    value: "border-bottom-style",
    type: OptionSelect,
    option: borderStyle
  },
  {
    label: "border-bottom-color",
    value: "border-bottom-color",
    type: OptionColor
  },
  { label: "outline-color", value: "outline-color", type: OptionColor },
  {
    label: "outline-style",
    value: "outline-style",
    type: OptionSelect,
    option: outlineStyle
  },
  {
    label: "outline-width",
    value: "outline-width",
    type: Option
  },
  { label: "clear", value: "clear", type: OptionSelect, option: clearStyle },
  { label: "cursor", value: "cursor", type: OptionSelect }, //
  { label: "display", value: "display", type: OptionSelect }, //
  { label: "float", value: "float", type: OptionSelect }, //
  { label: "position", value: "position", type: OptionSelect }, //
  { label: "top", value: "top", type: Option },
  { label: "left", value: "left", type: Option },
  { label: "bottom", value: "bottom", type: Option },
  { label: "right", value: "right", type: Option },
  { label: "overflow", value: "overflow", type: OptionSelect }, //
  { label: "position", value: "position", type: OptionSelect }, //
  { label: "vertical-align", value: "vertical-align", type: OptionSelect }, //
  { label: "z-index", value: "z-index", type: Option },
  { label: "letter-spacing", value: "letter-spacing", type: Option, pxOption: true }
];
