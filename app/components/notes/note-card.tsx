"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NoteCategory } from "@/lib/types";

export function NoteCard({
  title,
  verse,
  book,
  category,
  content,
  onOpen,
}: {
  title: string;
  verse: string;
  book: string;
  category: NoteCategory;
  content: string;
  onOpen: () => void;
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{verse}</CardDescription>
        <CardAction>
          {/* TODO: dropdown-menu for edit/delete, or drop this and rely on onOpen */}
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 min-h-[3.75rem] max-h-[3.75rem] text-sm text-muted-foreground">
          {content}
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary">{book}</Badge>
          <Badge variant="outline">{category}</Badge>
        </div>
        <Button variant="link" size="sm" onClick={onOpen}>
          View Note
        </Button>
      </CardFooter>
    </Card>
  );
}
