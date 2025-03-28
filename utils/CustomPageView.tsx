'use client';

import { trackServerConversion } from '@/app/actions/meta-conversions';
import { generateEventId } from '@/helpers/getBakedId';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PageView } from '@/helpers/fbTracking';


const CustomPageView = () => {
    const pathname = usePathname();
    const [eventId, setEventId] = useState<string | null>(null);

    useEffect(() => {
        // Generate a new event_id on every page change
        const newEventId = generateEventId();
        setEventId(newEventId);

        // Ensure sessionStorage is updated
        sessionStorage.setItem('latestEventId', newEventId);
    }, [pathname]);

    useEffect(() => {
        if (!eventId) return;

        // ✅ Ensure fbq is available before calling it
        const attemptClientTracking = () => {
            PageView(eventId);
            // if (typeof window !== 'undefined' && window.fbq) {
            //     console.log('🔵 Sending PageView to Facebook Pixel with eventID:', eventId);
            //     window.fbq('track', 'PageView', {}, { eventID: eventId });
            // } else {
            //     console.warn('🔴 Facebook Pixel (fbq) not available yet. Retrying...');
            //     setTimeout(attemptClientTracking, 200);
            // }
        };
        attemptClientTracking();

        // ✅ Server-side tracking (Conversion API)
        const sendToServer = async () => {
            // console.log('🟢 Sending PageView to Conversion API with eventID:', eventId);
            await trackServerConversion('PageView', { event_id: eventId });
        };
        sendToServer();
    }, [eventId]);

    return null;
};

export default CustomPageView;
