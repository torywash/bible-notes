export const NOTE_CATEGORIES = [
    "Study",
    "Prayer",
    "Question",
    "Sermon",
    "Testimony",
] as const;
export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export const CATEGORY_BADGE_CLASSES: Record<NoteCategory, string> = {
    Study:
        "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
    Prayer:
        "border-neutral-300 bg-white text-neutral-800 dark:border-neutral-600 dark:bg-white dark:text-neutral-900",
    Question:
        "border-green-300 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    Sermon:
        "border-yellow-300 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    Testimony:
        "border-green-300 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
};
export interface Note {
    id: string;
    userId: string;
    title: string;
    verse: string;
    book: string;
    category: NoteCategory;
    content: string;
    createdAt: string; // ISO 8601
}
