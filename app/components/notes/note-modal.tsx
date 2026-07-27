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

export type NoteFormValues = {
  title: string;
  verse: string;
  book: string;
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
  const [content, setContent] = useState("");

  // (re)fill the form whenever the modal opens, either from initialValues (edit) or blank (create)
  useEffect(() => {
    if (open) {
      setTitle(initialValues?.title ?? "");
      setVerse(initialValues?.verse ?? "");
      setBook(initialValues?.book ?? "");
      setContent(initialValues?.content ?? "");
    }
  }, [open, initialValues]);

  function handleSave() {
    onSave({ title, verse, book, content });
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
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-book">Book</FieldLabel>
            <Input
              id="note-modal-book"
              placeholder="Proverbs"
              value={book}
              onChange={(e) => setBook(e.target.value)}
            />
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
