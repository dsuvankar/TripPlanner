import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import Loading from "./Loading";
import FormPage from "./FormPage";

const CreateTrip = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return <div>{isLoading ? <Loading /> : <FormPage />}</div>;
};

export default CreateTrip;
