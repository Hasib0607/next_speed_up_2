import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const headersetting = await getHeaderSetting();

    const FACEBOOK_TEST_EVENT_CODE = headersetting?.facebook_test_event_code;
    const FACEBOOK_PIXEL_ID = headersetting?.facebook_pixel;
    const FACEBOOK_ACCESS_TOKEN =
        'EAAGaTqBSjNABOyFPr525g6effpbIo8yzRbD7fT8VwNLNFs3KyWUOYCJttWOgbcmgPjV8fZAAHJXAAtLjNOcKyvaOaIFAZAT7cQFbdUFGYXjotdx51Wj8rPhdLnI2W1ACkqg7B54OkLb8DPkUrcIEVZA4iNvPmEZBhalTZCDHTZCERi1ecwe912P3ZAPl78jljkGkAZDZD';
    // const FACEBOOK_ACCESS_TOKEN = headersetting?.facebook_access_token;

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const clientIp = headersList.get('x-forwarded-for') || '';
    // console.log("FACEBOOK_TEST_EVENT_CODE",FACEBOOK_TEST_EVENT_CODE);
    // console.log("FACEBOOK_PIXEL_ID",FACEBOOK_PIXEL_ID);
    // console.log("FACEBOOK_ACCESS_TOKEN",FACEBOOK_ACCESS_TOKEN);

    try {
        const { event_name, event_id, custom_data } = await req.json();

        const payload = {
            data: [
                {
                    event_name,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id,
                    // user_data: {
                    //     client_ip_address: clientIp,
                    //     client_user_agent: userAgent,
                    // },
                    custom_data,
                    action_source: 'website',
                },
            ],
            test_event_code: FACEBOOK_TEST_EVENT_CODE,
        };


        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const fbResponse = await response.json();

        // if (!response.ok) {
        //     return NextResponse.json({ error: fbResponse }, { status: response.status });
        // }

        return NextResponse.json(fbResponse);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send server event' },
            { status: 500 }
        );
    }
}
