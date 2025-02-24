import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ScrollBar from "./Component/Header/ScrollBar";
import SearchBar from "./Component/Header/SearchBar";
import HomePage from "./Component/Pages/HomePage";
import Header from "./Component/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HotelDetails from "./Component/Pages/HotelDetails";

function App() {
  return (
    <>
      <div className="mainDiv">
        <BrowserRouter>
          <Header/>
          <SearchBar/>
          <ScrollBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotelDetail/:id" element={<HotelDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
