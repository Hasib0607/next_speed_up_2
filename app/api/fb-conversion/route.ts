import getHeaderSetting from "@/utils/fetcher/getHeaderSetting";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const headersetting = await getHeaderSetting();

    const FACEBOOK_TEST_EVENT_CODE = headersetting?.facebook_test_event_code
    const FACEBOOK_PIXEL_ID = headersetting?.facebook_pixel
    const FACEBOOK_ACCESS_TOKEN = headersetting?.facebook_access_token

    // console.log("FACEBOOK_TEST_EVENT_CODE",FACEBOOK_TEST_EVENT_CODE);
    // console.log("FACEBOOK_PIXEL_ID",FACEBOOK_PIXEL_ID);
    // console.log("FACEBOOK_ACCESS_TOKEN",FACEBOOK_TEST_EVENT_CODE);
    

    try {
        const { event_name, event_id, user_data, custom_data } = await req.json();
        
        const payload = {
            event_name,
            event_time: Math.floor(Date.now() / 1000),
            event_id,
            user_data,
            custom_data,
            action_source: "website",
            test_event_code: FACEBOOK_TEST_EVENT_CODE, // For testing
        };

        const response = await fetch(
            `https://graph.facebook.com/v18.0/${FACEBOOK_PIXEL_ID}/events?access_token=${FACEBOOK_ACCESS_TOKEN}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: [payload] }),
            }
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to send event" }, { status: 500 });
    }
}
