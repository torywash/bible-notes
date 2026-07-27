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

export function NoteCard({
  title,
  verse,
  book,
  content,
  onOpen,
}: {
  title: string;
  verse: string;
  book: string;
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
        <p className="line-clamp-3 text-sm text-muted-foreground">{content}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge variant="secondary">{book}</Badge>
        <Button variant="link" size="sm" onClick={onOpen}>
          View Note
        </Button>
      </CardFooter>
    </Card>
  );
}
