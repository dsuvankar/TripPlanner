import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-11 gap-9 ">
      <h1 className="font-extrabold text-[40px] text-center mt-16 ">
        <span className="text-[#1295b3] drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,0.5)] ">
          Discover Your Next Adventure with AI:
          <br />
        </span>
        In a Personalised manner
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Welcome to your personalised AI trip planner
      </p>
      <Link to={"/trip"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default Hero;
