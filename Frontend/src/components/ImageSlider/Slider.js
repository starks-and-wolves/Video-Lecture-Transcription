import React, { useState } from "react";
import SliderContent from "./SliderContent";
import imageSlider from "./ImageSlider";
import Arrows from "./Arrows";
import Dots from "./Dots";

import "./Slider.css";

const len = imageSlider.length - 1;

function Slider(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ul className="list">
      <li>
        <div className="slider-container">
          <SliderContent activeIndex={activeIndex} imageSlider={imageSlider} />
          <Arrows
            prevSlide={() =>
              setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
            }
            nextSlide={() =>
              setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
            }
          />
          <Dots
            activeIndex={activeIndex}
            imageSlider={imageSlider}
            onclick={(activeIndex) => setActiveIndex(activeIndex)}
          />
        </div>
      </li>
      <li>
        <textarea className="textarea" rows="25">
          Full Transcript
        </textarea>
      </li>
    </ul>
  );
}

export default Slider;
