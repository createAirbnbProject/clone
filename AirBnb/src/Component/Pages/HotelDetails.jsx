import React, { useContext, useEffect, useState } from 'react'
import { ContextApi } from '../../ContextApi/ContextApi'
import { useParams } from 'react-router-dom'

const HotelDetails = () => {
  let { detail } = useContext(ContextApi)
  let { id } = useParams()
  let [hotel, setHotel] = useState(detail)
  let [hotelDetail, setHotelDetail] = useState([])

  let getData = () => {
    return hotel.map((item) => {
      if (item.id === id) {
        setHotelDetail(item);
      }
    });
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default HotelDetails
