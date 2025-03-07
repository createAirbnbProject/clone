import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../CSS/searchbar.css";

const SearchBar = () => {
  const destinationButtonRef = useRef(null);
  const guestButtonRef = useRef(null);
  const destinationPopupRef = useRef(null);
  const guestPopupRef = useRef(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0])
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0])


  const [inputValue, setInputValue] = useState("");
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

  const destinations =  [
    {
        id: 1,
        name: "Puducherry, Puducherry",
        description: "Popular beach destination",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/97624dd8-97a3-4733-97cc-b8dc0c74d23d.png",
    },
    {
        id: 2,
        name: "North Goa, Goa",
        description: "For sights like Fort Aguada",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/06f0f050-c167-4d1e-89e1-2775be94f82a.png",
    },
    {
        id: 3,
        name: "Ooty, Tamil Nadu",
        description: "Great for a weekend getaway",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/07869b83-5328-4f3d-8087-a7d1e9782434.png",
    },
    {
        id: 4,
        name: "South Goa, Goa",
        description: "For nature lovers",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/ebb968b2-3fb6-45d3-b675-7765e487f7b9.png",
    },
    {
        id: 5,
        name: "Mysore, Karnataka",
        description: "For its stunning architecture",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/2b5fff53-d328-4beb-839a-cfe4fcb4223a.png",
    },
    {
        id: 6,
        name: "Madikeri, Karnataka",
        description: "Great for a weekend getaway",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/4499ccb1-c8fb-4b5c-8383-44e589d200fa.png",
    },
    {
        id: 7,
        name: "Wayanad, Kerala",
        description: "Great for summer getaways",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/58e934fa-33ed-4caf-800e-7e268bb0d3c7.png",
    },
    {
        id: 8,
        name: "Calangute, Goa",
        description: "For its bustling nightlife",
        logo: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/447b22da-3842-4977-89c9-d58e182c0ce2.png",
    },
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
      <div className="search_box_main_container">
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
            <input
              type="date"
              value={fromDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setFromDate(()=>e.target.value)
                setToDate(()=>e.target.value)
              }}
            />
          </div>

          <div className="divider"></div>

          <div className="searchBar_items" tabIndex="0">
            <p>Check out</p>
            <input
              type="date"
              value={toDate}
              min={fromDate}
              onChange={(e) => setToDate(e.target.value)}
            />
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
        {isPopupOpen && filteredDestinations.length > 0 && (
          <div ref={destinationPopupRef} className="popup destination-popup">
            <p className="popup-title">Suggested Destinations</p>
            {filteredDestinations.map((destination, index) => (
              <button
                key={index}
                className="popup-item"
                onClick={() => handleDestinationSelect(destination.name)}
              >
                <span className="destination-icon"><img src={destination?.logo} alt="" height="10px" width="10px"/></span>
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
      </div>
    </>
  );
};

export default SearchBar;
