"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({
  books,
  activeBook,
  onSelectBook,
}: {
  books: [string, number][];
  activeBook: string | null;
  onSelectBook: (book: string | null) => void;
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="px-2 text-sm font-semibold">FaithOS</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Books</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeBook === null}
                  onClick={() => onSelectBook(null)}
                >
                  All Notes
                </SidebarMenuButton>
              </SidebarMenuItem>
              {books.map(([book, count]) => (
                <SidebarMenuItem key={book}>
                  <SidebarMenuButton
                    isActive={activeBook === book}
                    onClick={() => onSelectBook(book)}
                  >
                    {book}
                    <Badge variant="secondary" className="ml-auto">
                      {count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
