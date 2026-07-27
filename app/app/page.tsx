"use client";

import { useState } from "react";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SearchBar } from "@/components/search-bar";
import { NoteCard } from "@/components/notes/note-card";
import { NoteModal } from "@/components/notes/note-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);

  // TODO: replace with real notes state, e.g. seeded from + synced to localStorage
  const notes: {
    id: string;
    title: string;
    verse: string;
    book: string;
    content: string;
  }[] = [];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-3 border-b p-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <SearchBar value={search} onChange={setSearch} />
          {/* TODO: "New Note" button that opens NoteModal in create mode */}
          <Button>New Note</Button>
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
        open={openNoteId !== null}
        onOpenChange={(open) => !open && setOpenNoteId(null)}
      />
    </SidebarProvider>
  );
}
