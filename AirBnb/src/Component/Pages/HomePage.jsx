import React, { useState } from "react";
import "../../CSS/Home.css";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const images = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-598178014362166177/original/65798042-c2dd-4d98-ab59-7a0803dce120.jpeg?im_w=960&im_format=avif",
  "https://a0.muscache.com/im/pictures/miso/Hosting-765458466679599213/original/ca1524c3-a407-4ee4-8700-f157f44eb2ab.jpeg?im_w=720&im_format=avif",
  "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODQ0ODMwNjMyNjMzNzk4MDM0/original/e5d55874-38c4-4a8e-bc66-201946d0eceb.jpeg?im_w=480&im_format=avif&im_origin=fuzzy",
  "https://a0.muscache.com/im/pictures/miso/Hosting-598178014362166177/original/c94aed59-9979-47f2-8aa9-c710ce0477e8.jpeg?im_w=480&im_format=avif",
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("next");

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setDirection("next");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setDirection("prev");
    }
  };

  return (
    <div className="parentOfCard">
      <div
        className="childOfCard"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="imageContainer">
          <img
            src={images[currentIndex]}
            alt="Travel Destination"
            className="image_photo"
          />

          {isHovered && currentIndex > 0 && (
            <button className="nav_btn left_btn" onClick={handlePrev}>
              <FaChevronLeft />
            </button>
          )}

          {isHovered && currentIndex < images.length - 1 && (
            <button className="nav_btn right_btn" onClick={handleNext}>
              <FaChevronRight />
            </button>
          )}

          {isHovered && (
            <div className="dotsContainer">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${currentIndex === index ? "active" : ""}`}
                ></span>
              ))}
            </div>
          )}
        </div>

        <div className="hotelDetails">
          <div className="hotelNameandRating">
            <div>Hejamadi, India</div>
            <div className="ratingStar">
              <div style={{ marginTop: "3px" }}>
                <FaStar />
              </div>
              <div style={{ marginRight: "8px" }}>4.9</div>
            </div>
          </div>
          <div>
            <div className="hotelLocation">Sasihithlu Beach</div>
            <div className="hotelDate">7-12 March</div>
            <div className="hotelPrice">$200 night</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
