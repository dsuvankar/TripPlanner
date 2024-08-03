import React from "react";
import CardItem from "./CardItem";

const Itinerary = ({ tripData }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-10 mb-5">Places to Visit</h2>

      <div>
        {tripData?.tripData?.itinerary?.map((item, index) => (
          <div className="mb-3" key={index}>
            <h2 className="text-md font-bold">Day {item.day}</h2>
            <h2 className="text-sm text-orange-600 italic">{item.title}</h2>

            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {item?.places?.map((place, index) => (
                  <CardItem key={index} place={place} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
