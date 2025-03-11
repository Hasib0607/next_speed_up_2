"use client";

import { useEffect, useState } from "react";

export default function useBrowserInfo() {
  const [browser, setBrowser] = useState("Unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox")) {
      setBrowser("Mozilla Firefox");
    } else if (userAgent.includes("Edg")) {
      setBrowser("Microsoft Edge");
    } else if (userAgent.includes("Chrome")) {
      setBrowser("Google Chrome");
    } else if (userAgent.includes("Safari")) {
      setBrowser("Apple Safari");
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      setBrowser("Opera");
    } else {
      setBrowser("Unknown Browser");
    }
  }, []);

  return {browser}
}

