'use client'

import { useEffect } from 'react';

const PageView = ({ eventId }: any) => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'PageView', {}, { eventID: eventId });

            // Store the event_id in a global variable or send it to API
            window.latestEventId = eventId;
        } else {
            console.warn('Facebook Pixel (fbq) is not initialized.');
        }
    }, [eventId]);

    return null;
};

export default PageView