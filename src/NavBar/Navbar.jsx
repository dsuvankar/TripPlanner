import { Button } from "@/components/ui/button";
import React from "react";

const Navbar = () => {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Header */}
      <img src="/logo.svg" alt="" />
      <div className="">
        <Button>Sign Up</Button>
      </div>
    </div>
  );
};

export default Navbar;
