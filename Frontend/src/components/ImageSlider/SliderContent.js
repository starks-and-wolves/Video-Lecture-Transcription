import React from "react";
import { useRef } from "react";

import Card from "../ui/Card";

function SliderContent({ activeIndex, imageSlider }) {
  const descriptionInputRef = useRef();
  //const enteredDescription = descriptionInputRef.current.value;

  return (
    <section>
      {imageSlider.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <img className="slide-image" src={slide.image} alt="" />
          <hr />
          <hr />
          <textarea
            className="textarea"
            id="description"
            required
            rows="8"
            ref={descriptionInputRef}
          >
            {slide.description}
          </textarea>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
