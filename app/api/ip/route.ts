import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://ipinfo.io/json", { cache: "no-store" });
        // const response = await fetch("https://us1.api-bdc.net/data/client-info", { cache: "no-store" });
        // const response = await fetch("https://us1.api-bdc.net/data/reverse-geocode-client", { cache: "no-store" });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch IP data" }, { status: 500 });
    }
}
