import React, { useState } from "react";
import "../../CSS/scrollbar.css";
import ICONS from "../../Constant/scroll.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ScrollBar = () => {
  const [items,setItems] = useState(ICONS);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 8;

  const scrollForward = () => {
    if (startIndex + itemsPerPage < items.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const scrollBackward = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4);
    }
  };

  return (
    <div className="scroll-bar-container">
      <button
        onClick={scrollBackward}
        className={`scroll-button left_btn1 ${startIndex === 0 ? "hidden" : ""}`}
        disabled={startIndex === 0}
      >
        <FaChevronLeft />
      </button>

      <div className="scroll-container">
        <div
          className="scroll-wrapper"
          style={{ transform: `translateX(-${startIndex * 10}px)` }} 
        >
          {items.slice(startIndex, startIndex + itemsPerPage).map((item) => (
            <div key={item.id} className="scroll-item">
              <img src={item.img} alt={item.name} className="item-image" />
              <p className="item-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollForward}
        className={`scroll-button ${startIndex + itemsPerPage >= items.length ? "hidden" : ""}`}
        disabled={startIndex + itemsPerPage >= items.length}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ScrollBar;
