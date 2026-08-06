import { NextResponse } from "next/server";

// Temporary diagnostic endpoint — reports only whether each required env var
// is present (never its value), to distinguish a Vercel config issue from a
// code issue. Safe to leave public short-term; remove once auth is stable.
export async function GET() {
  return NextResponse.json({
    MONGODB_URI: Boolean(process.env.MONGODB_URI),
    AUTH_SECRET: Boolean(process.env.AUTH_SECRET),
    AUTH_GITHUB_ID: Boolean(process.env.AUTH_GITHUB_ID),
    AUTH_GITHUB_SECRET: Boolean(process.env.AUTH_GITHUB_SECRET),
    AUTH_GITHUB_OWNER_ID: Boolean(process.env.AUTH_GITHUB_OWNER_ID),
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });
}
