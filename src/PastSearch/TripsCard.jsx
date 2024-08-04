import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TripsCard = ({ tripData }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if (tripData) {
      GetPlacePhoto();
    }
  }, [tripData]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: tripData?.userSelection?.location?.label,
      };
      const result = await GetPlaceDetails(data);
      console.log(result.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        result.data.places[0].photos[4].name
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
    <Link to={"/view-trip/" + tripData?.id}>
      {" "}
      <div className="">
        <img
          className="w-[250px] h-[250px] rounded-xl "
          src={photoUrl ? photoUrl : "https://placehold.co/300"}
          alt=""
        />

        <h2 className="font-bold text-lg">
          {tripData?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-500">
          {tripData?.userSelection?.noOfDays} days for{" "}
          {tripData?.userSelection?.budget} budget
        </h2>
      </div>
    </Link>
  );
};

export default TripsCard;
