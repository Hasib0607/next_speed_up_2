import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch IP data" }, { status: 500 });
    }
}
