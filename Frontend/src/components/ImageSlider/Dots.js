import React from "react";

function Dots({ activeIndex, onclick, imageSlider }) {
  return (
    <div className="all-dots">
      {imageSlider.map((slide, index) => (
        <span
          key={index}
          className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
          onClick={() => onclick(index)}
        >
          <h4 className="h4">{index + 1}</h4>
        </span>
      ))}
    </div>
  );
}

export default Dots;
