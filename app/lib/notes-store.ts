"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import type { Note } from "@/lib/types";
import type { NoteFormValues } from "@/components/notes/note-modal";

export const GUEST_MODE_KEY = "guestMode";
const LOCAL_STORAGE_KEY = "notes";

export function useNotes() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  // Read synchronously on first render (not via effect) so `isGuest` is
  // already correct before isSignedOut is ever computed — otherwise, on a
  // client-side navigation into this page, `status` can already be
  // "unauthenticated" (carried over from the previous page) while `isGuest`
  // is still at its default `false`, making isSignedOut briefly true and
  // bouncing straight back to /login before the guest flag is ever checked.
  const [isGuest, setIsGuest] = useState(
    () => typeof window !== "undefined" && localStorage.getItem(GUEST_MODE_KEY) === "true"
  );
  const [notes, setNotes] = useState<Note[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load notes for guest mode. Runs independently of useSession()'s status
  // so it keeps working even if the auth backend is down or misconfigured.
  useEffect(() => {
    if (isAuthenticated || !isGuest) return; // Mongo effect below takes over when authenticated

    let cancelled = false;

    (async () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved && !cancelled) setNotes(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load notes from localStorage:", error);
      } finally {
        if (!cancelled) setHasLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isGuest]);

  // Mongo-backed loading, once a real session is confirmed.
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    (async () => {
      setIsGuest(false);
      try {
        const res = await fetch("/api/notes");
        if (!res.ok) throw new Error("Failed to load notes");
        const data: Note[] = await res.json();
        if (!cancelled) setNotes(data);
      } catch (error) {
        console.error("Failed to load notes:", error);
      } finally {
        if (!cancelled) setHasLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  // Guest mode persists to localStorage on every change; Mongo persists via
  // the API calls in saveNote/deleteNote directly, so no mirroring effect needed there.
  useEffect(() => {
    if (!isGuest || !hasLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  }, [notes, hasLoaded, isGuest]);

  const saveNote = useCallback(
    async (values: NoteFormValues, editingId?: string) => {
      if (isAuthenticated) {
        if (editingId) {
          const res = await fetch(`/api/notes/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const updated: Note = await res.json();
          setNotes((prev) => prev.map((note) => (note.id === editingId ? updated : note)));
        } else {
          const res = await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const created: Note = await res.json();
          setNotes((prev) => [created, ...prev]);
        }
        return;
      }

      if (editingId) {
        setNotes((prev) =>
          prev.map((note) => (note.id === editingId ? { ...note, ...values } : note))
        );
      } else {
        setNotes((prev) => [
          {
            ...values,
            id: crypto.randomUUID(),
            userId: "guest",
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    },
    [isAuthenticated]
  );

  const deleteNote = useCallback(
    async (id: string) => {
      if (isAuthenticated) {
        await fetch(`/api/notes/${id}`, { method: "DELETE" });
      }
      setNotes((prev) => prev.filter((note) => note.id !== id));
    },
    [isAuthenticated]
  );

  return {
    notes,
    hasLoaded,
    isAuthenticated,
    isGuest,
    isSignedOut: status === "unauthenticated" && !isGuest,
    saveNote,
    deleteNote,
  };
}
