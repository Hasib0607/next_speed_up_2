import { useState } from "react";

const useGeoLocation = () => {
  const [address, setAddress] = useState("");

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      if (!lat || !lng) {
        console.error("Latitude and longitude are required.");
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      if (!response.ok) {
        console.log("Failed to fetch the address data.");
      }

      const data = await response.json();
      setAddress(data.display_name || "Address not available");
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return { address, fetchAddress };
};

export default useGeoLocation;
