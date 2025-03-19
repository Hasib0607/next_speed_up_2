'use server';

import { cookies, headers } from 'next/headers';
import { createHash } from 'crypto';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

export async function trackServerConversion(
    eventName: string,
    customData: any
) {
    const headersetting = await getHeaderSetting();
    const headersList = await headers();

    const FACEBOOK_PIXEL_ID = headersetting?.facebook_pixel;
    const FACEBOOK_ACCESS_TOKEN = headersetting?.facebook_access_token;
    const FACEBOOK_TEST_EVENT_CODE = headersetting?.facebook_test_event_code;

    const userAgent = headersList.get('user-agent') || '';
    const clientIp = headersList.get('x-forwarded-for') || '';
    const referer = headersList.get('referer') || '';

    // Get user identifiers from cookies if available
    //   const cookieStore = await cookies();
    //   const emailCookie = cookieStore.get('user_email')?.value;

    // Hash user data for privacy
    //   const hashedEmail = emailCookie ?
    //     createHash('sha256').update(emailCookie.toLowerCase()).digest('hex') :
    //     undefined;

    const payload = {
        data: [
            {
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                action_source: 'website',
                event_id: customData.event_id,
                event_source_url: referer,
                user_data: {
                    client_ip_address: clientIp,
                    client_user_agent: userAgent,
                },
                custom_data: customData.custom_data,
            },
        ],
        test_event_code: FACEBOOK_TEST_EVENT_CODE,
    };

    // console.log("payload server",payload);
    

    // Send to Meta Conversions API
    const response = await fetch(
        `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }
    );

    return response.json();
}
