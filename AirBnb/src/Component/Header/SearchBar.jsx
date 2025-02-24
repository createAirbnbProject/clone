import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../CSS/searchbar.css";

const SearchBar = () => {
  const destinationButtonRef = useRef(null);
  const guestButtonRef = useRef(null);
  const destinationPopupRef = useRef(null);
  const guestPopupRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

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
        destinationPopupRef.current &&
        !destinationPopupRef.current.contains(event.target) &&
        destinationButtonRef.current &&
        !destinationButtonRef.current.contains(event.target)
      ) {
        setIsPopupOpen(false);
      }
      if (
        guestPopupRef.current &&
        !guestPopupRef.current.contains(event.target) &&
        guestButtonRef.current &&
        !guestButtonRef.current.contains(event.target)
      ) {
        setIsGuestPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate popup position for destination
  useLayoutEffect(() => {
    if (isPopupOpen && destinationButtonRef.current && destinationPopupRef.current) {
      const rect = destinationButtonRef.current.getBoundingClientRect();
      destinationPopupRef.current.style.top = `${rect.bottom + window.scrollY + 10}px`;
      destinationPopupRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  }, [isPopupOpen, inputValue]);

  // Calculate popup position for guests
  useLayoutEffect(() => {
    if (isGuestPopupOpen && guestButtonRef.current && guestPopupRef.current) {
      const rect = guestButtonRef.current.getBoundingClientRect();
      guestPopupRef.current.style.top = `${rect.bottom + window.scrollY + 10}px`;
      guestPopupRef.current.style.left = `${rect.left + window.scrollX}px`;
    }
  }, [isGuestPopupOpen]);

  const handleDestinationSelect = (destinationName) => {
    setInputValue(destinationName);
    setIsPopupOpen(false);
  };

  const handleGuestChange = (type, delta) => {
    setGuests((prevGuests) => {
      let newGuests = { ...prevGuests };

      // Prevent reducing adults to 0 if an infant or pet is selected
      if (type === "adults" && newGuests.adults === 1 && (newGuests.infants > 0 || newGuests.pets > 0)) {
        return prevGuests; // Do nothing if reducing adults would cause an issue
      }

      // Prevent selecting infants or pets without an adult or child
      if ((type === "infants" || type === "pets") && newGuests.adults === 0 && newGuests.children === 0) {
        return prevGuests; // Do nothing if no adult or child is selected
      }

      newGuests[type] = Math.max(0, newGuests[type] + delta); // Ensure no negative values

      return newGuests;
    });
  };


  const formatGuests = () => {
    let guestText = [];
    
    if (guests.adults > 0) guestText.push(`${guests.adults} Adult${guests.adults > 1 ? "s" : ""}`);
    if (guests.children > 0) guestText.push(`${guests.children} Child${guests.children > 1 ? "ren" : ""}`);
    if (guests.infants > 0) guestText.push(`${guests.infants} Infant${guests.infants > 1 ? "s" : ""}`);
    if (guests.pets > 0) guestText.push(`${guests.pets} Pet${guests.pets > 1 ? "s" : ""}`);

    return guestText.length > 0 ? guestText.join(", ") : "Add guests";
  };

  return (
    <>
      <div className="search_box">
        {/* Destination Selection */}
        <div
          className="searchBar_items"
          tabIndex="0"
          ref={destinationButtonRef}
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

        <div className="divider"></div>

        <div className="searchBar_items" tabIndex="0">
          <p>Check in</p>
          <input type="date" name="checkIn_date" />
        </div>

        <div className="divider"></div>

        <div className="searchBar_items" tabIndex="0">
          <p>Check out</p>
          <input type="date" name="checkOut_date" />
        </div>

        <div className="divider"></div>

        {/* Guest Selection */}
        <div
          className="searchBar_items"
          tabIndex="0"
          ref={guestButtonRef}
          onClick={() => setIsGuestPopupOpen(true)}
          aria-expanded={isGuestPopupOpen}
        >
          <p>Who</p>
          <input
            type="text"
            name="guests"
            placeholder="Add guests"
            readOnly
            value={formatGuests()}
          />
        </div>
      </div>

      {/* Destination Popup */}
      {/* Destination Popup */}
      {isPopupOpen && filteredDestinations.length > 0 && (
        <div ref={destinationPopupRef} className="popup destination-popup">
          <p className="popup-title">Suggested Destinations</p>
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

      {/* Guest Popup */}
      {isGuestPopupOpen && (
        <div ref={guestPopupRef} className="popup guest-popup">
          <p className="popup-title">Select Guests</p>
          {Object.entries(guests).map(([key, value]) => (
            <div key={key} className="guest-row">
              <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <div className="guest-controls">

                <button
                  onClick={() => handleGuestChange(key, -1)}
                  disabled={(key === "adults" || key === "children") && (guests.adults + guests.children === 1) && (guests.infants > 0 || guests.pets > 0) || guests[key] === 0}
                >
                  -
                </button>

                <span>{value}</span>

                <button
                  onClick={() => handleGuestChange(key, 1)}
                  disabled={(key === "infants" || key === "pets") && (guests.adults === 0 && guests.children === 0)}
                >
                  +
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
