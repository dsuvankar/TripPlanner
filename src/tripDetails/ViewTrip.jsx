import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import HotelRecommendation from "./components/HotelRecommendation";
import Itinerary from "./components/Itinerary";
import { useNavigate } from "react-router-dom";

const ViewTrip = () => {
  const [tripData, setTripData] = useState([]);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  if (!user) {
    navigate("/");
  }

  const getTripData = async () => {
    const docRef = doc(db, "TripPlannerAI", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripData(docSnap.data());
    } else {
      console.log("No such document!");
      toast("No Trip Found");
    }
  };
  return (
    <div className="sm:px-20 md:px-20 lg:px-44 xl:px-56 px-10">
      {/* Informations */}

      <InfoSection tripData={tripData} />
      {/* Recommended Hotels */}
      <HotelRecommendation tripData={tripData} />
      {/* Daily Plan */}

      <Itinerary tripData={tripData} />

      {/* Footers */}
    </div>
  );
};

export default ViewTrip;
