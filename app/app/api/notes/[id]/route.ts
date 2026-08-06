import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getNotesCollection } from "@/lib/mongodb";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const collection = await getNotesCollection();

  const result = await collection.findOneAndUpdate(
    { id, userId: session.user.id },
    {
      $set: {
        title: body.title,
        verse: body.verse,
        book: body.book,
        category: body.category,
        content: body.content,
      },
    },
    { returnDocument: "after", projection: { _id: 0 } }
  );

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const collection = await getNotesCollection();
  const result = await collection.deleteOne({ id, userId: session.user.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
