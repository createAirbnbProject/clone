import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../CSS/searchbar.css";

const SearchBar = () => {
  const buttonRef = useRef(null);
  const popupRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const destinations = [
    { name: "Puducherry, Puducherry", description: "Popular beach destination", icon: "🏖️" },
    { name: "North Goa, Goa", description: "For sights like Fort Aguada", icon: "🌊" },
    { name: "Ooty, Tamil Nadu", description: "Great for a weekend getaway", icon: "⛰️" },
    { name: "Manali, Himachal Pradesh", description: "Famous for snowy mountains", icon: "🏔️" },
    { name: "Shimla, Himachal Pradesh", description: "A beautiful hill station", icon: "🏞️" },
  ];

  // Filter destinations based on input value
  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate popup position
  useLayoutEffect(() => {
    if (isPopupOpen && buttonRef.current && popupRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      popupRef.current.style.top = `${rect.bottom + window.scrollY + 10}px`;
      popupRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  }, [isPopupOpen, inputValue]);

  const handleDestinationSelect = (destinationName) => {
    setInputValue(destinationName);
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="search_box">
        <div
          className="searchBar_items"
          tabIndex="0"
          ref={buttonRef}
          onClick={() => setIsPopupOpen(true)}
          aria-expanded={isPopupOpen}
        >
          <p>Where</p>
          <input
            type="text"
            placeholder="Search destinations"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsPopupOpen(true); // Keep popup open when typing
            }}
          />
        </div>

        <div className="searchBar_items">
          <p>Check in</p>
          <input type="date" name="checkIn_date" />
        </div>

        <div className="searchBar_items">
          <p>Check out</p>
          <input type="date" name="checkOut_date" />
        </div>
        
        <div className="searchBar_items">
          <p>Who</p>
          <input type="text" name="guests" placeholder="Add guests" />
        </div>
      </div>

      {isPopupOpen && filteredDestinations.length > 0 && (
        <div ref={popupRef} className="popup">
          <p>Suggested Destinations</p>
          {filteredDestinations.map((destination, index) => (
            <button
              key={index}
              className="popup-item"
              onClick={() => handleDestinationSelect(destination.name)}
            >
              <span className="destination-icon">{destination.icon}</span>
              <div className="destination-details">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
