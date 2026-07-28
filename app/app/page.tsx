"use client";

import { useEffect, useState } from "react";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SearchBar } from "@/components/search-bar";
import { NoteCard } from "@/components/notes/note-card";
import { NoteModal, type NoteFormValues } from "@/components/notes/note-modal";
import { NoteViewDialog } from "@/components/notes/view-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NOTE_CATEGORIES, type Note, type NoteCategory } from "@/lib/types";
import { BIBLE_BOOKS } from "@/lib/scripture";

export default function Home() {
  const [search, setSearch] = useState("");
  const [viewingNoteId, setViewingNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [bookFilter, setBookFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<NoteCategory[]>([]);

  // runs once, after the component mounts in the browser
  useEffect(() => {
    try {
      const saved = localStorage.getItem("notes");
      if (saved) setNotes(JSON.parse(saved));
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // runs every time `notes` changes, writing it back out
  // (skipped until the load above finishes, so it never clobbers storage with the empty initial state)
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  }, [notes, hasLoaded]);

  const viewingNote = notes.find((note) => note.id === viewingNoteId);
  const editingNote = notes.find((note) => note.id === editingNoteId);

  const filteredNotes = notes.filter((note) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      note.title.toLowerCase().includes(q) ||
      note.verse.toLowerCase().includes(q) ||
      note.book.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q);
    const matchesBook = bookFilter === null || note.book === bookFilter;
    const matchesCategory =
      categoryFilter.length === 0 || categoryFilter.includes(note.category);
    return matchesSearch && matchesBook && matchesCategory;
  });

  function handleSave(values: NoteFormValues) {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) => (note.id === editingNote.id ? { ...note, ...values } : note))
      );
    } else {
      setNotes((prev) => [
        { ...values, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }
  }

  function handleDelete(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  const bookCounts = new Map<string, number>();
  for (const note of notes) {
    bookCounts.set(note.book, (bookCounts.get(note.book) ?? 0) + 1);
  }
  const bookOrder = (book: string) => {
    const index = (BIBLE_BOOKS as readonly string[]).indexOf(book);
    return index === -1 ? BIBLE_BOOKS.length : index;
  };
  const books = [...bookCounts.entries()].sort((a, b) => bookOrder(a[0]) - bookOrder(b[0]));
  // books: [string, number][]  → e.g. [["Genesis", 2], ["Proverbs", 5]], canonical order, non-Bible entries (e.g. "Prayer") last

  return (
    <SidebarProvider style={{ "--sidebar-width": "18rem" } as React.CSSProperties}>
      <AppSidebar books={books} activeBook={bookFilter} onSelectBook={setBookFilter} />
      <SidebarInset>
        <header className="flex items-center gap-4 border-b p-5">
          <SidebarTrigger size="icon-lg" />
          <Separator orientation="vertical" className="h-8" />
          <div className="ml-auto flex items-center gap-4">
            <SearchBar value={search} onChange={setSearch} />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="lg">
                    Tags{categoryFilter.length > 0 ? ` (${categoryFilter.length})` : ""}
                  </Button>
                }
              />
              <DropdownMenuContent>
                {NOTE_CATEGORIES.map((c) => (
                  <DropdownMenuCheckboxItem
                    key={c}
                    checked={categoryFilter.includes(c)}
                    onCheckedChange={(checked) =>
                      setCategoryFilter((prev) =>
                        checked ? [...prev, c] : prev.filter((x) => x !== c)
                      )
                    }
                  >
                    {c}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="lg" onClick={() => setIsCreating(true)}>New Note</Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              No notes match your filters.
            </p>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                verse={note.verse}
                book={note.book}
                category={note.category}
                content={note.content}
                onOpen={() => setViewingNoteId(note.id)}
              />
            ))
          )}
        </main>
      </SidebarInset>
      <NoteModal
        open={editingNoteId !== null || isCreating}
        initialValues={editingNote}
        onSave={handleSave}
        onOpenChange={(open) => {
          if (!open) {
            setEditingNoteId(null);
            setIsCreating(false);
          }
        }}
      />
      <NoteViewDialog
        note={viewingNote}
        open={viewingNoteId !== null}
        onOpenChange={(open) => {
          if (!open) setViewingNoteId(null);
        }}
        onEdit={() => {
          if (!viewingNote) return;
          setViewingNoteId(null);
          setEditingNoteId(viewingNote.id);
        }}
        onDelete={() => {
          if (!viewingNote) return;
          handleDelete(viewingNote.id);
          setViewingNoteId(null);
        }}
      />
    </SidebarProvider>
  );
}
