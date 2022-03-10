import React, { useState } from "react";
import ReactDOM, { render } from "react-dom";

import Map from "./Map";
import ReactTooltip from "react-tooltip";

import "./styles.css";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <h3>Country: {content}</h3>

      <Map setTooltipContent={setContent} />
    </div>
  );
}

render(<App />, document.getElementById("root"));
