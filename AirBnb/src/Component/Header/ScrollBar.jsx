// ScrollBar.js (with updated button visibility and transitions)
import React, { useRef, useState, useEffect } from "react";
import "../../CSS/scrollbar.css"
import ICONS from '../../Constant/scroll.json'

const ScrollBar = () => {
  const [items, setItems] = useState(ICONS);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;

  const scrollForward = () => {
    if (startIndex  < items.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const scrollBackward = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4);
      if (startIndex - 1 === 0) {
      }
    }
  };

  useEffect(() => {
    // Hide backward button initially
    if (startIndex === 0) {
    }
  }, [startIndex]);

  return (
    <div className="scroll-bar-container">
      <div style={{marginTop:"-5px",marginLeft:"10px"}}>
      <button
        onClick={scrollBackward}
        className={"scroll-button"}
        disabled={startIndex === 0}
      >
        ◀
      </button>
      </div>

      <div className="scroll-container">
        {items.slice(startIndex, startIndex + itemsPerPage).map((item) => (
          <div key={item.id} className="scroll-item">
            <img src={item.img} alt={item.name} className="item-image" />
            <p className="item-name">{item.name}</p>
          </div>
        ))}
      </div>
      <button
        onClick={scrollForward}
        className="scroll-button"
        disabled={startIndex + itemsPerPage>= items.length}
        style={{marginTop:"-5px"}}
      >
        ▶
      </button>
    </div>
  );
};

export default ScrollBar;