"use client";

import { useEffect, useState } from "react";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SearchBar } from "@/components/search-bar";
import { NoteCard } from "@/components/notes/note-card";
import { NoteModal, type NoteFormValues } from "@/components/notes/note-modal";
import { Button } from "@/components/ui/button";

type Note = {
  id: string;
  title: string;
  verse: string;
  book: string;
  content: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // runs once, after the component mounts in the browser
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
    setHasLoaded(true);
  }, []);

  // runs every time `notes` changes, writing it back out
  // (skipped until the load above finishes, so it never clobbers storage with the empty initial state)
  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, hasLoaded]);

  const editingNote = notes.find((note) => note.id === openNoteId);

  function handleSave(values: NoteFormValues) {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) => (note.id === editingNote.id ? { ...note, ...values } : note))
      );
    } else {
      setNotes((prev) => [{ ...values, id: crypto.randomUUID() }, ...prev]);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-3 border-b p-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <SearchBar value={search} onChange={setSearch} />
          <Button onClick={() => setIsCreating(true)}>New Note</Button>
        </header>
        <main className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              verse={note.verse}
              book={note.book}
              content={note.content}
              onOpen={() => setOpenNoteId(note.id)}
            />
          ))}
        </main>
      </SidebarInset>
      <NoteModal
        open={openNoteId !== null || isCreating}
        initialValues={editingNote}
        onSave={handleSave}
        onOpenChange={(open) => {
          if (!open) {
            setOpenNoteId(null);
            setIsCreating(false);
          }
        }}
      />
    </SidebarProvider>
  );
}
