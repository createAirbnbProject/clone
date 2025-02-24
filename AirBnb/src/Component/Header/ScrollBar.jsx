import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import "../../CSS/scrollbar.css";
import ICONS from "../../Constant/scroll.json";

const ScrollBar = () => {
  const [items, setItems] = useState(ICONS);
  const [isChecked, setIsChecked] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const scrollWrapperRef = useRef(null);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  // Scroll forward button function
  const scrollForward = () => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Scroll backward button function
  const scrollBackward = () => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Handle scroll visibility
  const handleScroll = () => {
    if (scrollWrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollWrapperRef.current;
      setAtStart(scrollLeft <= 0);
      setAtEnd(scrollLeft >= scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollWrapperRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);



  return (
    <div className="scroll-bar-container">
      <div className="scroll-bar-child">
        
        <button
          onClick={scrollBackward}
          className={`scroll-button left_btn1 ${atStart ? "hidden-button" : ""}`}
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable Container */}
        <div className="scroll-container" ref={scrollWrapperRef}>
          {items.map((item) => (
            <div key={item.id} className="scroll-item">
              <img src={item.img} alt={item.name} className="item-image" />
              <p className="item-name">{item.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollForward}
          className={`scroll-button ${atEnd ? "hidden-button" : ""}`}
        >
          <FaChevronRight />
        </button>
      </div>

      <button className="filter-button">
        <FiFilter className="filter-icon" />
        Filters
      </button>

      <label className="toggle-container">
        <span className="toggle-label">Display total before taxes</span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="toggle-input"
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export default ScrollBar;
