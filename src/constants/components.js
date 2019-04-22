import { Button, Alert, Badge } from "reactstrap";

export const components = [
  { label: "Button", value: Button, type: "Bootstrap" },
  { label: "Alert", value: Alert, type: "Bootstrap" },
  { label: "Badge", value: Badge, type: "Bootstrap" },
  { label: "div", value: "div", type: "core" },
  { label: "input", value: "input", type: "core", nochildren: true },
  { label: "span", value: "span", type: "core" },
  { label: "p", value: "p", type: "core" },
  { label: "hr", value: "hr", type: "core", nochildren: true },
  { label: "textarea", value: "textarea", type: "core", nochildren: true },
  { label: "a", value: "a", type: "core" },
  { label: "button", value: "button", type: "core" },
  { label: "label", value: "label", type: "core" }
].sort((a, b) => {
  if (a.label < b.label) return -1;
  if (b.label < a.label) return 1;
  return 0;
});
