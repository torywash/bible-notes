"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCombobox } from "@/components/book-combobox";
import { NOTE_CATEGORIES, type NoteCategory } from "@/lib/types";

export type NoteFormValues = {
  title: string;
  verse: string;
  book: string;
  category: NoteCategory;
  content: string;
};

export function NoteModal({
  open,
  onOpenChange,
  initialValues,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: NoteFormValues;
  onSave: (values: NoteFormValues) => void;
}) {
  const [title, setTitle] = useState("");
  const [verse, setVerse] = useState("");
  const [book, setBook] = useState("");
  const [category, setCategory] = useState<NoteCategory>(NOTE_CATEGORIES[0]);
  const [content, setContent] = useState("");

  // (re)fill the form whenever the modal opens, either from initialValues (edit) or blank (create)
  useEffect(() => {
    if (open) {
      setTitle(initialValues?.title ?? "");
      setVerse(initialValues?.verse ?? "");
      setBook(initialValues?.book ?? "");
      setCategory(initialValues?.category ?? NOTE_CATEGORIES[0]);
      setContent(initialValues?.content ?? "");
    }
  }, [open, initialValues]);

  function handleSave() {
    onSave({ title, verse, book, category, content });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValues ? "Edit Note" : "New Note"}</DialogTitle>
          <DialogDescription>View or edit this note.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="note-modal-title">Title</FieldLabel>
            <Input
              id="note-modal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-verse">Verse</FieldLabel>
            <Input
              id="note-modal-verse"
              placeholder="Proverbs 10:12"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
              className={verse === "Prayer" ? "text-muted-foreground" : undefined}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-book">Book</FieldLabel>
            <BookCombobox
              id="note-modal-book"
              value={book}
              onChange={setBook}
              disabled={category === "Prayer"}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-category">Category</FieldLabel>
            <Select
              value={category}
              onValueChange={(value) => {
                const nextCategory = value as NoteCategory;
                setCategory(nextCategory);
                if (nextCategory === "Prayer") {
                  if (book.trim() === "") setBook("Prayer");
                  if (verse.trim() === "") setVerse("Prayer");
                }
              }}
            >
              <SelectTrigger id="note-modal-category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NOTE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-content">Content</FieldLabel>
            <Textarea
              id="note-modal-content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
