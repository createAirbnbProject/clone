import React, { useState } from "react";
import "../../CSS/Home.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import HOTELDETAILS from "../../Constant/hotelDetails.json";
import Heart from "react-heart";

const HomePage = () => {
  const [indexMap, setIndexMap] = useState({});
  const [isHovered, setIsHovered] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(HOTELDETAILS);
  const [active, setActive] = useState({});

  const handleNext = (hotelIndex, totalImages) => {
    setIndexMap((prev) => ({
      ...prev,
      [hotelIndex]:
        (prev[hotelIndex] || 0) < totalImages - 1
          ? (prev[hotelIndex] || 0) + 1
          : prev[hotelIndex],
    }));
  };

  const handlePrev = (hotelIndex) => {
    setIndexMap((prev) => ({
      ...prev,
      [hotelIndex]:
        (prev[hotelIndex] || 0) > 0
          ? (prev[hotelIndex] || 0) - 1
          : prev[hotelIndex],
    }));
  };

  const handleHeart = (hotelIndex) => {
    setActive((prev) => ({
      ...prev,
      [hotelIndex]: !prev[hotelIndex],
    }));
  };

  return (
    <div className="parentOfCard">
      {hotelDetails.map((hotel, hotelIndex) => {
        const currentIndex = indexMap[hotelIndex] || 0;
        return (
          <div key={hotelIndex} className="hotelCard">
            <div
              className="childOfCard"
              onMouseEnter={() => setIsHovered(hotelIndex)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="imageContainer">
                <img
                  src={hotel.images[currentIndex]}
                  alt="Travel Destination"
                  className="image_photo"
                />
                <div className="heart">
                  <div className="heartStyle">
                    <Heart
                      inactiveColor="grey"
                      activeColor="red"
                      animationTrigger="click"
                      animationScale={1.2}
                      animationDuration={0.1}
                      isActive={active[hotelIndex] || false}
                      onClick={() => handleHeart(hotelIndex)}
                      style={{
                        fill: active[hotelIndex] ? "red" : "white", 
                        stroke: active[hotelIndex] ? "red" : "#333", 
                        // strokeWidth: "1px",
                      }}
                    />
                  </div>
                </div>

                {isHovered === hotelIndex && currentIndex > 0 && (
                  <button
                    className="nav_btn left_btn"
                    onClick={() => handlePrev(hotelIndex)}
                  >
                    <FaChevronLeft />
                  </button>
                )}

                {isHovered === hotelIndex &&
                  currentIndex < hotel.images.length - 1 && (
                    <button
                      className="nav_btn right_btn"
                      onClick={() =>
                        handleNext(hotelIndex, hotel.images.length)
                      }
                    >
                      <FaChevronRight />
                    </button>
                  )}

                {isHovered === hotelIndex && (
                  <div className="dotsContainer">
                    {hotel.images.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${
                          currentIndex === index ? "active" : ""
                        }`}
                      ></span>
                    ))}
                  </div>
                )}
              </div>

              <div className="hotelDetails">
                <div className="hotelNameandRating">
                  <div>
                    {hotel.city}, {hotel.state}
                  </div>
                  <div className="ratingStar">
                    <FaStar />
                    <div>{hotel.rating}</div>
                  </div>
                </div>
                <div>
                  <div className="hotelLocation">{hotel.hotelName}</div>
                  <div className="hotelDate">7-12 March</div>
                  <div className="hotelPrice">${hotel.price}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
