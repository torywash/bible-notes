import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getNotesCollection } from "@/lib/mongodb";
import type { Note } from "@/lib/types";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collection = await getNotesCollection();
  const docs = await collection
    .find({ userId: session.user.id }, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(docs as unknown as Note[]);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const note: Note = {
    id: crypto.randomUUID(),
    userId: session.user.id,
    title: body.title,
    verse: body.verse,
    book: body.book,
    category: body.category,
    content: body.content,
    createdAt: new Date().toISOString(),
  };

  const collection = await getNotesCollection();
  // insertOne mutates its argument to add `_id` — pass a copy so `note`
  // (returned below) stays free of that Mongo-internal field.
  await collection.insertOne({ ...note });

  return NextResponse.json(note, { status: 201 });
}
