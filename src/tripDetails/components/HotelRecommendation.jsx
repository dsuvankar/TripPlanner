import React from "react";

import HotelCardInfo from "./HotelCardInfo";

const HotelRecommendation = ({ tripData }) => {
  return (
    <div className="">
      <h2 className="text-xl font-bold mt-10 mb-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
        {tripData?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardInfo key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelRecommendation;
