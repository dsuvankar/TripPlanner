import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardInfo = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  const hotelName = hotel?.HotelName || hotel?.hotelName || hotel?.name;
  const hotelAddress =
    hotel?.address || hotel?.HotelAddress || hotel?.hotelAddress;

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotelName,
      };
      const result = await GetPlaceDetails(data);
      console.log(result.data.places[0].photos[1].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );

      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotelName} ${hotelAddress}`}
      target="_blank">
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl} className="rounded-lg h-[300px] w-[300px]" />
        <h2 className="font-medium">{hotelName}</h2>
        <h2 className="text-xs text-gray-500">{hotelAddress}</h2>
        <h2 className="text-sm ">{hotel?.Price || hotel?.price}</h2>
        <h2 className="text-sm ">{hotel?.Rating || hotel?.rating}</h2>
        {}
      </div>
    </Link>
  );
};

export default HotelCardInfo;
