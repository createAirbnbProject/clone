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

  const destinations = [
    { name: "Puducherry, Puducherry", description: "Popular beach destination", icon: "🏖️" },
    { name: "North Goa, Goa", description: "For sights like Fort Aguada", icon: "🌊" },
    { name: "Ooty, Tamil Nadu", description: "Great for a weekend getaway", icon: "⛰️" },
    { name: "Manali, Himachal Pradesh", description: "Famous for snowy mountains", icon: "🏔️" },
    { name: "Shimla, Himachal Pradesh", description: "A beautiful hill station", icon: "🏞️" },
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
