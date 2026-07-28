import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Note } from "@/lib/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export function NoteViewDialog({
    note,
    open,
    onOpenChange,
    onEdit,
    onDelete,
}: {
    note?: Note;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit: () => void;
    onDelete: () => void;
}) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{note?.title}</DialogTitle>
                    <DialogDescription>{note?.verse}</DialogDescription>
                </DialogHeader>
                <p className="whitespace-pre-wrap text-sm">{note?.content}</p>
                <DialogFooter className="flex-row justify-end">
                    <Button variant="outline" onClick={onEdit}>Edit</Button>
                    <AlertDialog>
                        <AlertDialogTrigger render={<Button variant="destructive" />}>
                            Delete
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Delete this note?</AlertDialogTitle>
                            <AlertDialogDescription>This can&apos;t be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                variant="destructive"
                                onClick={() => {
                                onDelete();
                                onOpenChange(false);
                                }}
                            >
                                Delete
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}