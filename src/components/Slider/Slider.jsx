import React, { useEffect, useState } from "react";
import { Div } from "../components_index.js";
import "./Slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ProductCard } from "../components_index.js";

const Slider = ({ slides, intervalTime, className1, className2, cardsToShow, className3, className4, className5, className6 }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = slides.length;

  const visibleSlides = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleSlides.push(slides[(currentSlideIndex + i) % totalSlides]);
  }

  useEffect(() => {
    if (intervalTime) {
      const timeOut = setTimeout(() => {
        handleNextSlider();
      }, intervalTime);

      return () => clearTimeout(timeOut);
    }
  }, [currentSlideIndex, intervalTime]);

  const handlePrevSlider = () => {
    setCurrentSlideIndex((prevSlideIndex) =>
      prevSlideIndex === 0 ? totalSlides - 1 : prevSlideIndex - 1
    );
  };

  const handleNextSlider = () => {
    setCurrentSlideIndex((prevSlideIndex) =>
      (prevSlideIndex + 1) % totalSlides
    );
  };

  return (
    <div className={className1 ? className1 : "slider-container"}>

      <Div className={className2 ? className2 : "slider-inner-container"}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={className4 ? className4 : "left-arrow"}
          onClick={handlePrevSlider}
          tabIndex={0}
          role="button"
          aria-label="Desplazar al anterior"
        />
        {visibleSlides.map((slide, index) => (
          <Div key={index} className={className3 ? className3 : "slide"}>
            {slide.image ? (
              <img
                src={slide.image}
                alt={slide.title}
                className={className6 ? className6 : "slide-image"}
              />
            ) : (
              <ProductCard product={slide} />
            )}
          </Div>
        ))}
        <FontAwesomeIcon
          icon={faChevronRight}
          className={className5 ? className5 : "right-arrow"}
          onClick={handleNextSlider}
          tabIndex={0}
          role="button"
          aria-label="Desplazar al siguiente"
        />
      </Div>


    </div>
  );
};

export default Slider;
