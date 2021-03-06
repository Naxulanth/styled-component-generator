import Option from "containers/Option";
import OptionColor from "containers/OptionColor";
import OptionSelect from "containers/OptionSelect";
import {
  borderStyle,
  outlineStyle,
  clearStyle,
  cursorStyle,
  displayStyle,
  floatStyle,
  positionStyle,
  overflowStyle,
  verticalAlignStyle,
  textAlignStyle,
  textDecorationStyle,
  textTransformStyle,
  alignItemsStyle,
  justifyContentStyle,
  textDecorationStyleStyle
} from "./options";

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
  { label: "cursor", value: "cursor", type: OptionSelect, option: cursorStyle },
  {
    label: "display",
    value: "display",
    type: OptionSelect,
    option: displayStyle
  },
  { label: "float", value: "float", type: OptionSelect, option: floatStyle },
  {
    label: "position",
    value: "position",
    type: OptionSelect,
    option: positionStyle
  },
  { label: "top", value: "top", type: Option },
  { label: "left", value: "left", type: Option },
  { label: "bottom", value: "bottom", type: Option },
  { label: "right", value: "right", type: Option },
  {
    label: "overflow",
    value: "overflow",
    type: OptionSelect,
    option: overflowStyle
  },
  {
    label: "vertical-align",
    value: "vertical-align",
    type: OptionSelect,
    option: verticalAlignStyle
  },
  {
    label: "z-index",
    value: "z-index",
    type: Option,
    min: -2147483648,
    max: 2147483647,
    pxOption: true,
    noPx: true
  },
  {
    label: "letter-spacing",
    value: "letter-spacing",
    type: Option,
    pxOption: true
  },
  {
    label: "text-align",
    value: "text-align",
    type: OptionSelect,
    option: textAlignStyle
  },
  {
    label: "text-decoration",
    value: "text-decoration",
    type: OptionSelect,
    option: textDecorationStyle
  },
  { label: "text-indent", value: "text-indent", type: Option },
  {
    label: "text-transform",
    value: "text-transform",
    type: OptionSelect,
    option: textTransformStyle
  },
  {
    label: "word-spacing",
    value: "word-spacing",
    type: Option,
    pxOption: true
  },
  {
    label: "align-items",
    value: "align-items",
    type: OptionSelect,
    option: alignItemsStyle
  },
  {
    label: "justify-content",
    value: "justify-content",
    type: OptionSelect,
    option: justifyContentStyle
  },
  {
    label: "text-decoration-color",
    value: "text-decoration-color",
    type: OptionColor
  },
  {
    label: "text-decoration-style",
    value: "text-decoration-style",
    type: OptionSelect,
    option: textDecorationStyleStyle
  },
].sort((a, b) => {
  if (a.label < b.label) return -1;
  if (b.label < a.label) return 1;
  return 0;
});
