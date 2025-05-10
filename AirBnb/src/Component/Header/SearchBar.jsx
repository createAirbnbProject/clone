import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../CSS/searchbar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      destination: "",
      fromDate: new Date().toISOString().split("T")[0],
      toDate: new Date().toISOString().split("T")[0],
      guests: { adults: 0, children: 0, infants: 0, pets: 0 },
    },
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isGuestPopupOpen, setIsGuestPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [guestPopupPosition, setGuestPopupPosition] = useState({ top: 0, left: 0 });

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

  const destinationInputValue = watch("destination");
  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(destinationInputValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".destination-popup") && !event.target.closest(".destination-button")) {
        setIsPopupOpen(false);
      }
      if (!event.target.closest(".guest-popup") && !event.target.closest(".guest-button")) {
        setIsGuestPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePopupOpen = (event, type) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const position = { top: rect.bottom + window.scrollY + 10, left: rect.left + window.scrollX };

    if (type === "destination") {
      setPopupPosition(position);
      setIsPopupOpen(true);
    } else {
      setGuestPopupPosition(position);
      setIsGuestPopupOpen(true);
    }
  };

  const handleDestinationSelect = (destinationName) => {
    setValue("destination", destinationName);
    setIsPopupOpen(false);
  };

  const handleGuestChange = (type, delta) => {
    const currentGuests = getValues("guests");
    let newGuests = { ...currentGuests };
    newGuests[type] = Math.max(0, newGuests[type] + delta);
    setValue("guests", newGuests);
  };

  const formatGuests = () => {
    const guests = watch("guests");
    let guestText = [];
    Object.entries(guests).forEach(([key, value]) => {
      if (value > 0) guestText.push(`${value} ${key.charAt(0).toUpperCase() + key.slice(1)}`);
    });
    return guestText.length > 0 ? guestText.join(", ") : "Add guests";
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search_box_main_container">
      <div className="search_box">
        <div className="searchBar_items destination-button" onClick={(e) => handlePopupOpen(e, "destination")} tabIndex='0'>
          <p>Where</p>
          <input type="text" placeholder="Search destinations" {...register("destination")} />
        </div>

        <div className="divider"></div>

        <div className="searchBar_items" tabIndex='0'>
          <p>Check in</p>
          <input type="date" {...register("fromDate")} min={new Date().toISOString().split("T")[0]} onFocus={(e) => e.target.showPicker()}/>
        </div>

        <div className="divider"></div>

        <div className="searchBar_items" tabIndex='0'>
          <p>Check out</p>
          <input type="date" {...register("toDate")} min={watch("fromDate")} onFocus={(e) => e.target.showPicker()} />
        </div>

        <div className="divider"></div>

        <div className="searchBar_items guest-button" onClick={(e) => handlePopupOpen(e, "guest")} tabIndex='0'>
          <p>Who</p>
          <input type="text" placeholder="Add guests" readOnly value={formatGuests()} />
        </div>

        <div className="divider"></div>

        <button type="submit" className="search_btn">
          <FaSearch fill="white" className="search_icon" />
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup destination-popup" style={popupPosition}>
          <p className="popup-title">Suggested Destinations</p>
          {filteredDestinations.map((destination, index) => (
            <button key={index} type="button" className="popup-item" onClick={() => handleDestinationSelect(destination.name)}>
              <span className="destination-icon">{destination.icon}</span>
              <div className="destination-details">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isGuestPopupOpen && (
        <div className="popup guest-popup" style={guestPopupPosition}>
          <p className="popup-title">Select Guests</p>
          {Object.entries(watch("guests")).map(([key, value]) => (
            <div key={key} className="guest-row">
              <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <div className="guest-controls">
                <button type="button" onClick={() => handleGuestChange(key, -1)} disabled={value === 0}>-</button>
                <span>{value}</span>
                <button type="button" onClick={() => handleGuestChange(key, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
