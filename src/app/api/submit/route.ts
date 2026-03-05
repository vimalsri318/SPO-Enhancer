import { NextRequest, NextResponse } from "next/server";

// Webhook URL lives ONLY in the server environment variable.
// Set it in .env.local (local) or Vercel → Project Settings → Environment Variables (production).
const WEBHOOK_URL = process.env.WEBHOOK_URL || "";

export async function POST(req: NextRequest) {
    if (!WEBHOOK_URL) {
        return NextResponse.json(
            { error: "Webhook URL is not configured on the server. Set the WEBHOOK_URL environment variable." },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();

        const upstream = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const text = await upstream.text();

        return new NextResponse(text, {
            status: upstream.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err: unknown) {
        console.error("[submit proxy] error:", err);
        return NextResponse.json(
            { error: "Failed to reach webhook." },
            { status: 502 }
        );
    }
}
