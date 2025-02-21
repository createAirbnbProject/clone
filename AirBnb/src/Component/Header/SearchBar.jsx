import React from 'react';
import '../../CSS/searchbar.css';
const SearchBar = () => {
  return (
    <div className='search_box'>
      <div className='searchBar_items' tabIndex="0">
        <p>Where</p>
        <input type="text" name='destination' placeholder='Search destinations' />
      </div>
      <div className='searchBar_items' tabIndex="0">
        <div>Check in</div>
        <input type='date' name='checkIn_date' placeholder='Add date' />
      </div>
      <div className='searchBar_items' tabIndex="0">
        <p>Check out</p>
        <input type='date' name='checkOut_date' placeholder='Add date' />
      </div>
      <div className='searchBar_items' tabIndex="0">
        <p>Who</p>
        <input type='text' name='age' placeholder='Add guests' />
      </div>
    </div>
  );
};

export default SearchBar