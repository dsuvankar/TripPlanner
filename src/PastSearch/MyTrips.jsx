import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import TripsCard from "./TripsCard";

const MyTrips = () => {
  const navigation = useNavigation();
  const [prevTrips, setPrivTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "TripPlannerAI"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);

    setPrivTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      setPrivTrips((preVal) => [...preVal, doc.data()]);
    });
  };

  return (
    <div className=" mt-10 md:px-20  px-10">
      <h2 className="font-bold text-2xl mb-5">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {prevTrips.map((tripData, index) => (
          <TripsCard key={index} tripData={tripData} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
