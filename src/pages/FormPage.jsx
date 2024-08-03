import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { chatSession } from "@/service/GeminiAPI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { Turtle } from "lucide-react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const logInWithGoogle = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateButton = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      formData?.location &&
      formData?.noOfDays &&
      formData?.noOfPeople &&
      formData?.budget
    ) {
      toast({
        variant: "success",
        title: "All are alright",
        description: "Let's go",
      });

      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location?.label
      )
        .replace("{Days}", formData?.noOfDays)
        .replace("{people}", formData?.noOfPeople)
        .replace("{budget}", formData?.budget)
        .replace("{Days}", formData?.noOfDays);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripDetailsText = await result?.response?.text();
      console.log("--", tripDetailsText);
      setLoading(false);
      SaveAiTrip(tripDetailsText);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please Fill all the Field",
      });
      console.log("please fill all the form");
    }
  };

  const SaveAiTrip = async (TripDetails) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    let tripData;

    try {
      tripData = JSON.parse(TripDetails);
    } catch (error) {
      console.error("Failed to parse TripDetails JSON:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save trip. Please try again.",
      });
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, "TripPlannerAI", docID), {
        userSelection: formData,
        tripData,
        userEmail: user?.email,
        id: docID,
      });
      navigate("/view-trip/" + docID);
    } catch (error) {
      console.error("Error saving trip to Firestore:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save trip. Please try again.",
      });
    }

    setLoading(false);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateButton();
      });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      {loading ? (
        <div>
          <div className="mb-9 sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10">
            <h2 className="font-bold text-3xl">
              Your Trip Plan is getting Generated 🥳
            </h2>
            <p className="text-xl mt-3 text-gray-500">
              Kindly have a patience 🤗
            </p>
          </div>
          <Loading />
        </div>
      ) : (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10 ">
          <div className="">
            <h2 className="font-bold text-3xl">What&apos;s Your Plan </h2>
            <p className="text-xl mt-3 text-gray-500">
              Here put some info for our AI
            </p>
          </div>
          {/* Form */}
          <div className="mt-20 flex flex-col gap-8">
            <div className="">
              <h2 className="text-xl font-medium my-3">
                Select Your Destination
              </h2>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (value) => {
                    setPlace(value);
                    handleInputChange("location", value);
                  },
                }}
              />
            </div>

            <div>
              <h2 className="text-xl font-medium my-3">
                How many days you are planning to stay
              </h2>
              <Input
                placeholder={"Ex. 3 Days"}
                type="number"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              />
            </div>

            <div className="">
              <h2 className="text-xl font-medium my-3">
                What is your Budget for this trip?
              </h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
                      formData?.budget == item.title && `border-black shadow-lg`
                    }`}>
                    <h2 className="text-3xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <h2 className="text-xl font-medium my-3">
                Who do you plan to travelling with?
              </h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectTravelList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("noOfPeople", item.people)}
                    className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
                      formData?.noOfPeople == item.people &&
                      `border-black shadow-lg`
                    }`}>
                    <h2 className="text-3xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 flex justify-center items-center">
              <Button onClick={onGenerateButton}>Generate Trip</Button>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <img src="/logo.svg" alt="" />
                    <h2 className="font-bold text-lg mt-7">
                      Please Login with your Google Account
                    </h2>
                    <Button
                      onClick={logInWithGoogle}
                      className="w-full mt-5 flex gap-5">
                      <FcGoogle className="w-6 h-6" /> Sign In With Google
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </>
  );
};

export default FormPage;
