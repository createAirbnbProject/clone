import React, { useState, useEffect } from "react";
import "../../CSS/Home.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import HOTELDETAILS from "../../Constant/hotelDetails.json";
import Heart from "react-heart";
import { Link } from "react-router-dom";

const HomePage = () => {
  let [indexMap, setIndexMap] = useState({});
  let [isHovered, setIsHovered] = useState(null);
  let [active, setActive] = useState({});
  let [visibleHotels, setVisibleHotels] = useState(12);
  let [loading, setLoading] = useState(true); // First time loading
  let [isLoadingMore, setIsLoadingMore] = useState(false); // "Show More" loading

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulated initial load
  }, []);

  let handleNext = (hotelIndex, totalImages) => {
    setIndexMap((prev) => ({
      ...prev,
      [hotelIndex]:
        (prev[hotelIndex] || 0) < totalImages - 1
          ? (prev[hotelIndex] || 0) + 1
          : prev[hotelIndex],
    }));
  };

  let handlePrev = (hotelIndex) => {
    setIndexMap((prev) => ({
      ...prev,
      [hotelIndex]:
        (prev[hotelIndex] || 0) > 0
          ? (prev[hotelIndex] || 0) - 1
          : prev[hotelIndex],
    }));
  };

  let handleHeart = (hotelIndex) => {
    setActive((prev) => ({
      ...prev,
      [hotelIndex]: !prev[hotelIndex],
    }));
  };

  let handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleHotels((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 1000);
  };

  let handleShowLess = () => {
    setVisibleHotels(12);
  };

  return (
    <>
      <div className="parentOfCard">
        {loading ? (
          <div className="skeletonContainer">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="skeletonCard">
                <div className="skeletonImage"></div>
                <div className="skeletonText"></div>
                <div className="skeletonText short"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {HOTELDETAILS.slice(0, visibleHotels).map((hotel, hotelIndex) => {
              let currentIndex = indexMap[hotelIndex] || 0;
              return (
                <div key={hotel.id} className="hotelCard">
                  <div
                    className="childOfCard"
                    onMouseEnter={() => setIsHovered(hotelIndex)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className="imageContainer">
                      <Link to={`/hotelDetail/${hotel.id}`} target="_blank">
                        <img
                          src={hotel.images[currentIndex]}
                          alt="Travel Destination"
                          className="image_photo"
                        />
                      </Link>
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
                        <div className="hotelPrice">₹{hotel.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Skeleton loader only for newly loading hotels */}
            {isLoadingMore && (
              <div className="skeletonContainer">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="skeletonCard">
                    <div className="skeletonImage"></div>
                    <div className="skeletonText"></div>
                    <div className="skeletonText short"></div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Show More Button */}
      </div>

      <div className="letterShowMore">
      <div className="letter">Continue exploring Countryside</div>
      {!loading && !isLoadingMore && (
        <div className="showMoreContainer">
          {visibleHotels < HOTELDETAILS.length ? (
            <button className="showMoreBtn" onClick={handleShowMore}>
              Show More
            </button>
          ) : (
            <button className="showMoreBtn" onClick={handleShowLess}>
              Show Less
            </button>
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default HomePage;
