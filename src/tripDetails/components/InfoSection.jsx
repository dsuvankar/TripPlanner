import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";

const InfoSection = ({ tripData }) => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (tripData) {
      GetPlacePhoto();
    }
  }, [tripData]);

  useEffect(() => {
    if (photos.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [photos]);

  const GetPlacePhoto = async () => {
    try {
      const locationLabel = tripData?.userSelection?.location?.label;
      if (!locationLabel) {
        console.error("Error: locationLabel is empty or undefined.");
        return;
      }

      const data = { textQuery: locationLabel };
      const result = await GetPlaceDetails(data);

      const fetchedPhotos = result.data.places[0]?.photos || [];
      if (fetchedPhotos.length === 0) {
        console.error("Error: No photos available.");
        return;
      }
      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div>
      {photos.length > 0 && (
        <img
          src={PHOTO_REF_URL.replace("{NAME}", photos[currentIndex]?.name)}
          alt="Place"
          className="h-[340px] mt-5 w-full object-cover rounded-lg"
        />
      )}

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {tripData?.userSelection?.location?.label}
        </h2>

        <div className="flex gap-5">
          <h2 className="bg-gray-200 p-2 px-3 rounded-full">
            {tripData?.userSelection?.noOfDays}{" "}
            {tripData?.userSelection?.noOfDays > 1 ? "Days" : "Day"}
          </h2>
          <h2 className="bg-gray-200 p-2 px-3 rounded-full">
            {tripData?.userSelection?.budget} budget
          </h2>
          <h2 className="bg-gray-200 p-2 px-3 rounded-full">
            For {tripData?.userSelection?.noOfPeople}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
