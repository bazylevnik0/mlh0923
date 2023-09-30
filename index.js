import { createElement } from "react";
import { createRoot } from "react-dom/client";

function Greeting({ name }) {
  return createElement(
    "h1",
    { className: "greeting" },
    "H3llo ",
    createElement("i", null, name),
    ". Welcome!",
  );
}

const domNode = document.getElementById("navigation");
const root = createRoot(domNode);
root.render(createElement(Greeting, { name: "Nik0" }));
