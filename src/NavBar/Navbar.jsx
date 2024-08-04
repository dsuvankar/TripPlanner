import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { googleLogout } from "@react-oauth/google";

const Navbar = () => {
  const [position, setPosition] = React.useState("bottom");
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  const logInWithGoogle = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
      });
  };

  const signIn = () => {
    if (!user) {
      setOpenDialog(true);
      return;
    }
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* Header */}
      <img src="/logo.svg" alt="" />
      <div className="">
        {user ? (
          <div className="flex gap-4">
            <a href="/my-trips">
              {" "}
              <Button className="rounded-full" variant="outline">
                My Trips
              </Button>
            </a>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.picture}
                    alt=""
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 cursor-pointer">
                  <DropdownMenuLabel>
                    <h2 onClick={handleLogout}>Log Out</h2>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div>
            <Button onClick={signIn}>Sign Up</Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <img src="/logo.svg" alt="Logo" />
                    <h2 className="font-bold text-lg mt-7">
                      Please log in with your Google account
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
