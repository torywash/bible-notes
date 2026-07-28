export const NOTE_CATEGORIES = [
    "Study",
    "Prayer",
    "Question",
    "Sermon",
    "Testimony",
] as const;
export type NoteCategory = (typeof NOTE_CATEGORIES)[number];
export interface Note {
    id: string;
    title: string;
    verse: string;
    book: string;
    category: NoteCategory;
    content: string;
    createdAt: string; // ISO 8601
}
