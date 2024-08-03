import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    // const locationLabel = tripData?.userSelection?.location?.label;
    // const textQuery = locationLabel ? String(locationLabel) : "";

    // console.log(textQuery);

    // if (!textQuery.trim()) {
    //   console.error("Error: textQuery is empty or undefined.");
    //   return;
    // }

    try {
      const data = {
        textQuery: place.name,
      };
      const result = await GetPlaceDetails(data);
      console.log(result.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[3].name
      );

      setPhotoUrl(PhotoUrl);
      console.log(result.data.places[0]);
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <Link
      target="_blank"
      to={`https://www.google.com/maps/search/?api=1&query=${place?.name}`}>
      <div className="border broder-black p-3 hover:scale-105 transition-all   shadow-sm  flex gap-3 rounded-xl">
        <img className="w-[150px] h-[150px] rounded-lg" src={photoUrl} alt="" />
        <div className="">
          <h2 className="font-bold">{place.name}</h2>
          <h2 className="text-sm">{place.details}</h2>
          <h2 className="text-sm">Rating: {place.rating}</h2>
          <h2 className="text-sm">Duration: {place.time_to_spend}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;
