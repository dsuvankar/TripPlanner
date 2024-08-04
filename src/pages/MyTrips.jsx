import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

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

    prevTrips([]); //??

    const q = query(
      collection(db, "TripPlannerAI"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      setPrivTrips((preVal) => [...preVal, doc.data()]);
    });
  };
  return <div></div>;
};

export default MyTrips;
