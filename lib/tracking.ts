import { TRACK_DEVIATION } from "@/consts";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "@/helpers/localStorage";
import { numberParser } from "@/helpers/numberParser";

// lib/tracking.ts
export const initializeVisitorTracking = () => {
    if (typeof window === 'undefined') return;


  
    // Get existing session or create new one
    const session = getFromLocalStorage('visitorSession')
    const currentPath = window.location.pathname;
  
    if (!session) {
      // New visitor
      const session = {
        startTime: new Date().getTime(),
        visitedPages: [currentPath],
        trackingSent: false
      };
      saveToLocalStorage('visitorSession',session)
      
      // Set timeout for 10 minutes
      const timerId = setTimeout(() => {
        sendTrackingData();
      }, TRACK_DEVIATION); // 10 minutes
      
      // Store timer ID
      saveToLocalStorage('trackingTimer',timerId.toString())
    } else {
      // Existing visitor - update visited pages
      if (!session.visitedPages.includes(currentPath)) {
        session.visitedPages.push(currentPath);
        saveToLocalStorage('visitorSession',session)
      }
      
      // Check if 10 minutes have passed
      const elapsed = new Date().getTime() - session.startTime;
    //   console.log("new Date().getTime()",new Date().getTime());
    //   console.log("session.startTime",session.startTime);
    //   console.log("elapsed >= TRACK_DEVIATION",elapsed >= TRACK_DEVIATION);
      
      if (elapsed >= TRACK_DEVIATION && !session.trackingSent) {
    // sendTrackingData();

    }
    sendTrackingData();
    }
  };
  
  const sendTrackingData = () => {
    const session = getFromLocalStorage('visitorSession')
    if (!session) return;
    
    // Prevent duplicate sends
    if (session.trackingSent) return;
    
    // Your tracking API call
    // fetch('/api/track-visitor', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     visitedPages: session.visitedPages,
    //     duration: new Date().getTime() - session.startTime
    //   }),
    // });
    console.log("data sent");
    
  
    // Mark as tracked and clean up
    session.trackingSent = true;
    saveToLocalStorage('visitorSession',session)
    removeFromLocalStorage('trackingTimer')
    clearTimeout(numberParser(getFromLocalStorage('trackingTimer')));
  };