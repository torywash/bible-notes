"use client";

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

export function NoteModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{/* TODO: note.title, or "New Note" when creating */}</DialogTitle>
          <DialogDescription>View or edit this note.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="note-modal-title">Title</FieldLabel>
            <Input id="note-modal-title" />
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-verse">Verse</FieldLabel>
            <Input id="note-modal-verse" placeholder="Proverbs 10:12" />
          </Field>
          <Field>
            <FieldLabel htmlFor="note-modal-content">Content</FieldLabel>
            <Textarea id="note-modal-content" rows={6} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          {/* TODO: wire onClick to save handler, then call onOpenChange(false) */}
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
