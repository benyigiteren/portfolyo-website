import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "yigiteren_org_homepage_v1";
const COUNTER_BASE = "https://countapi.mileshilliard.com/api/v1";

export async function GET(request: NextRequest) {
  const shouldIncrement = request.nextUrl.searchParams.get("hit") === "1";
  const action = shouldIncrement ? "hit" : "get";

  try {
    const response = await fetch(`${COUNTER_BASE}/${action}/${COUNTER_KEY}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Counter service unavailable");
    const data = await response.json() as { value?: string | number };
    const count = Number(data.value);
    if (!Number.isFinite(count)) throw new Error("Invalid counter response");
    return NextResponse.json({ count }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ count: 0, unavailable: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }
}