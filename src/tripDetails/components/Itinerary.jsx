import React from "react";
import CardItem from "./CardItem";

const Itinerary = ({ tripData }) => {
  if (!tripData?.tripData?.itinerary?.length) {
    return <p className="text-gray-600 italic">No itinerary available.</p>;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mt-10 mb-5">Places to Visit</h2>
      {tripData.tripData.itinerary.map((item, dayIndex) => (
        <div className="mb-6" key={dayIndex}>
          <h3 className="text-md font-bold">
            Day {item.Day || item.day || dayIndex + 1}
          </h3>
          <p className="text-sm text-orange-600 italic">
            {item.Theme || item.title || "No theme available"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {(item.Places || item.places || []).map((place) => (
              <CardItem
                key={place.id || place.PlaceName || place.placeName}
                place={place}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Itinerary;
