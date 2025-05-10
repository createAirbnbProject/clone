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
import { ContextApi } from "./ContextApi/ContextApi";
import HOTELINFO from "../src/Constant/hotelDetails.json";

function App() {
  let [detail, setDetail] = useState(HOTELINFO);
  console.log(detail);
  return (
    <>
      <div className="mainDiv">
        <ContextApi.Provider value={{ detail }}>
          <BrowserRouter>
            <Header />
            <SearchBar />
            <ScrollBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hotelDetail/:id" element={<HotelDetails />} />
            </Routes>
          </BrowserRouter>
        </ContextApi.Provider>
      </div>
    </>
  );
}

export default App;
