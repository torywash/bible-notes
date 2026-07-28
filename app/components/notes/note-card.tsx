"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_BADGE_CLASSES, type NoteCategory } from "@/lib/types";

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
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1 min-h-[1.25rem]">{verse}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 min-h-[3.75rem] max-h-[3.75rem] text-sm text-muted-foreground">
          {content}
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary">{book}</Badge>
          <Badge variant="outline" className={CATEGORY_BADGE_CLASSES[category]}>
            {category}
          </Badge>
        </div>
        <Button variant="link" size="sm" onClick={onOpen}>
          View Note
        </Button>
      </CardFooter>
    </Card>
  );
}
