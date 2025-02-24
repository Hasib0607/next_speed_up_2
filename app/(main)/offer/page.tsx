import Offer from '@/components/Offer';
import getDesign from '@/utils/fetcher/getDesign';

import React from "react";

async function getIPData() {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" }); // Disable caching for fresh data
    if (!res.ok) {
      throw new Error("Failed to fetch IP data");
    }
    return await res.json();
  } catch (error) {
    return { error: "Failed to fetch IP data" };
  }
}

export default async function OfferPage() {
  const ipData = await getIPData();
    const design = await getDesign();
    return <Offer design={design} ipData={ipData}/>;
}
