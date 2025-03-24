// import { TRACK_DEVIATION } from '@/consts';
export const TRACK_DEVIATION = 160;
import { TRIGGER_E_TRACK } from '@/consts';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    saveToLocalStorage,
} from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import moment from 'moment';

// lib/tracking.ts
export const initializeVisitorTracking = async () => {
    if (typeof window === 'undefined') return;
    
    saveToLocalStorage(TRIGGER_E_TRACK, true);

    // Get existing session or create new one
    const session = getFromLocalStorage('visitorSession');
    const currentPath = window.location.pathname;

    if (!session) {
        // New visitor
        const session = {
            startTime: new Date().getTime(),
            formatedStartTime: moment(new Date().getTime()).format('hh:mm:ss'),
            visitedPages: [
                { path: currentPath, firstTime: true, trackingSent: false },
            ],
        };
        saveToLocalStorage('visitorSession', session);

        // Set timeout for 10 minutes
        const timerId = setTimeout(() => {
            sendTrackingData(currentPath, false, false);
        }, TRACK_DEVIATION); // 10 minutes

        const trackingTimer = timerId.toString();

        // Store timer ID
        saveToLocalStorage('trackingTimer', trackingTimer);
    } else {
        // Existing visitor - update visited pages
        const isVisited = session.visitedPages.some(
            (item: any) => item.path === currentPath
        );

        const isPageTracked = session.visitedPages.some(
            (item: any) => item.path === currentPath && item.trackingSent
        );
        const isPageTrackedFirstTime = session.visitedPages.some(
            (item: any) => item.path === currentPath && item.firstTime
        );

        if (!isVisited) {
            session.visitedPages.push({
                path: currentPath,
                firstTime: true,
                trackingSent: false,
            });
            saveToLocalStorage('visitorSession', session);
        }

        const elapsed = new Date().getTime() - session.startTime;
        const elapsedInSeconds = numberParser(elapsed / 1000);

        // console.log({
        //     TRACK_DEVIATION: TRACK_DEVIATION,
        //     elapsedInSeconds: elapsedInSeconds,
        //     moment: moment(session.startTime).format('hh:mm:ss'),
        // });

        if (isPageTrackedFirstTime && !isPageTracked) {
            sendTrackingData(currentPath, false, false);
        }
        // console.log(
        //     'elapsedInSeconds >= TRACK_DEVIATION',
        //     elapsedInSeconds >= TRACK_DEVIATION
        // );

        // Check if 10 minutes have passed
        if (elapsedInSeconds >= TRACK_DEVIATION) {
            sendTrackingData(currentPath, false, true);
        }
    }
};

const sendTrackingData = (
    pathToUpdate: string,
    firstTime: boolean,
    secondTime?: boolean
) => {
    const session = getFromLocalStorage('visitorSession');
    if (!session) return;

    const isTrackedPage = session.visitedPages.some(
        (item: any) => item.path === pathToUpdate && item.trackingSent
    );

    // Prevent duplicate sends
    if (!secondTime && isTrackedPage) return;

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
    // console.log('isTrackingSent', isTrackedPage);
    // console.log('secondTime', secondTime);

    // Mark as tracked and clean up
    const updatedRoutes = session.visitedPages.map((route: any) => {
        if (route.path === pathToUpdate) {
            return secondTime
                ? { ...route, firstTime, secondTime, trackingSent: true }
                : { ...route, firstTime, trackingSent: true };
        } else return route;
    });

    session.visitedPages = updatedRoutes;
    saveToLocalStorage('visitorSession', session);
    clearTimeout(numberParser(getFromLocalStorage('trackingTimer')));
    removeFromLocalStorage('trackingTimer');
};
