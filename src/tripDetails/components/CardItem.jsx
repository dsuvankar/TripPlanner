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
    // if (!place?.PlaceName || ) {
    //   console.error("Place name is missing.");
    //   return;
    // }

    try {
      const data = {
        textQuery: place.PlaceName || place.placeName,
      };
      const result = await GetPlaceDetails(data);
      const photoName = result?.data?.places?.[0]?.photos?.[3]?.name;
      if (!photoName) {
        console.error("Photo not available");
        return;
      }

      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
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
      target="_blank"
      to={`https://www.google.com/maps/search/?api=1&query=${
        place?.PlaceName || place?.placeName
      }`}>
      <div className="border broder-black p-3 hover:scale-105 transition-all   shadow-sm  flex gap-3 rounded-xl">
        <img className="w-[150px] h-[150px] rounded-lg" src={photoUrl} alt="" />
        <div className="">
          <h2 className="font-bold">{place.PlaceName || place.placeName}</h2>
          <h2 className="text-sm">
            {place.PlaceDetails || place.placeDetails}
          </h2>
          <h2 className="text-sm">Rating: {place.Rating || place.rating}</h2>
          <h2 className="text-sm">
            Duration: {place.TimeToTravel || place.timeToSpend}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;
