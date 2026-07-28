"use client";

import { useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { OLD_TESTAMENT_BOOKS, NEW_TESTAMENT_BOOKS } from "@/lib/scripture";

export function BookCombobox({
  id,
  value,
  onChange,
  disabled,
  placeholder = "Select a book...",
}: {
  id?: string;
  value: string;
  onChange: (book: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          />
        }
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) min-w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search books..." />
          <CommandList>
            <CommandEmpty>No book found.</CommandEmpty>
            <CommandGroup heading="Old Testament">
              {OLD_TESTAMENT_BOOKS.map((book) => (
                <CommandItem
                  key={book}
                  value={book}
                  data-checked={value === book}
                  onSelect={() => {
                    onChange(book);
                    setOpen(false);
                  }}
                >
                  {book}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="New Testament">
              {NEW_TESTAMENT_BOOKS.map((book) => (
                <CommandItem
                  key={book}
                  value={book}
                  data-checked={value === book}
                  onSelect={() => {
                    onChange(book);
                    setOpen(false);
                  }}
                >
                  {book}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
