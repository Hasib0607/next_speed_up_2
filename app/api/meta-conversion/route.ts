import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const headersetting = await getHeaderSetting();
    const headersList = await headers();

    const FACEBOOK_PIXEL_ID = headersetting?.facebook_pixel;
    const FACEBOOK_ACCESS_TOKEN = headersetting?.facebook_access_token;
    const FACEBOOK_TEST_EVENT_CODE = headersetting?.facebook_test_event_code;

    const userAgent = headersList.get('user-agent') || '';
    const clientIp = headersList.get('x-forwarded-for') || '';
    const referer = headersList.get('referer') || '';

    // console.log("FACEBOOK_TEST_EVENT_CODE",FACEBOOK_PIXEL_ID);
    // console.log("clientIp",clientIp);
    // console.log("referer",referer);
    

    try {
        const { event_name, event_id, custom_data } = await req.json();

        const payload = {
            data: [
                {
                    event_name,
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: 'website',
                    event_id,
                    event_source_url: referer,
                    user_data: {
                        client_ip_address: clientIp,
                        client_user_agent: userAgent,
                    },
                    custom_data,
                },
            ],
            test_event_code: FACEBOOK_TEST_EVENT_CODE,
        };

        // console.log("da",payload);

        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const fbResponse = await response.json();

        return NextResponse.json(fbResponse);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send server event' },
            { status: 500 }
        );
    }
}
