# shadcn/ui component reference

Basic import + usage syntax for every component installed in `components/ui/`.
Style: `base-nova` (built on `@base-ui/react`, not Radix). Icons: `lucide-react`.

Note: this style uses base-ui's `render` prop instead of Radix's `asChild` —
e.g. `<DialogTrigger render={<Button />}>Open</DialogTrigger>` rather than
wrapping a `<Button>` as a child with `asChild`.

---

## Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card"

<Card size="default"> {/* or size="sm" */}
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>{/* button or menu */}</CardAction>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <p>Footer</p>
  </CardFooter>
</Card>
```

## Button

```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="default">Click me</Button>
```
- `variant`: `default` `outline` `secondary` `ghost` `destructive` `link`
- `size`: `default` `xs` `sm` `lg` `icon` `icon-xs` `icon-sm` `icon-lg`

## Badge

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Proverbs</Badge>
```
- `variant`: `default` `secondary` `destructive` `outline` `ghost` `link`

## Input

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Search notes..." />
```

## Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Write your note..." />
```

## Label

```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="title">Title</Label>
<Input id="title" />
```

## Input Group

```tsx
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"

<InputGroup>
  <InputGroupAddon><SearchIcon /></InputGroupAddon>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Go</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

## Field

```tsx
import { Field, FieldSet, FieldGroup, FieldLegend, FieldLabel, FieldContent, FieldTitle, FieldDescription, FieldError, FieldSeparator } from "@/components/ui/field"

<FieldGroup>
  <Field>
    <FieldLabel htmlFor="verse">Verse</FieldLabel>
    <Input id="verse" />
    <FieldDescription>e.g. Proverbs 10:12</FieldDescription>
  </Field>
</FieldGroup>
```

## Separator

```tsx
import { Separator } from "@/components/ui/separator"

<Separator orientation="horizontal" /> {/* or "vertical" */}
```

## Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="old">
  <TabsList>
    <TabsTrigger value="old">Old Testament</TabsTrigger>
    <TabsTrigger value="new">New Testament</TabsTrigger>
  </TabsList>
  <TabsContent value="old">...</TabsContent>
  <TabsContent value="new">...</TabsContent>
</Tabs>
```

## Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button />}>New Note</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>New Note</DialogTitle>
      <DialogDescription>Add a note for a verse.</DialogDescription>
    </DialogHeader>
    {/* form fields */}
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>
        Cancel
      </DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Sheet

```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger render={<Button />}>Edit Note</SheetTrigger>
  <SheetContent side="right"> {/* "top" | "right" | "bottom" | "left" */}
    <SheetHeader>
      <SheetTitle>Edit Note</SheetTitle>
      <SheetDescription>Update your note below.</SheetDescription>
    </SheetHeader>
    {/* form fields */}
  </SheetContent>
</Sheet>
```

## Alert Dialog

```tsx
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Delete
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this note?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Dropdown Menu

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
    ⋮
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Tooltip

`app/layout.tsx` must be wrapped in `<TooltipProvider>` (already done).

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
    <StarIcon />
  </TooltipTrigger>
  <TooltipContent>Favorite</TooltipContent>
</Tooltip>
```

## Command (⌘K palette)

```tsx
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from "@/components/ui/command"

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search notes or verses..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Notes">
      <CommandItem>How to Cope</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

## Sidebar

Requires `SidebarProvider` at the root of the layout that contains it.

```tsx
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarRail } from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Bible Notes</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Books</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Proverbs</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>...</SidebarFooter>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {/* main page content */}
  </SidebarInset>
</SidebarProvider>
```

`useSidebar()` hook is also exported for reading/toggling collapsed state.

## Scroll Area

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

<ScrollArea className="h-72">
  {/* long list of notes */}
  <ScrollBar orientation="vertical" />
</ScrollArea>
```

## Empty

```tsx
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"

<Empty>
  <EmptyHeader>
    <EmptyMedia><BookOpenIcon /></EmptyMedia>
    <EmptyTitle>No notes yet</EmptyTitle>
    <EmptyDescription>Create your first note to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>New Note</Button>
  </EmptyContent>
</Empty>
```

## Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-24 w-full rounded-xl" />
```

## Progress

```tsx
import { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue } from "@/components/ui/progress"

<Progress value={62}>
  <ProgressLabel>Reading plan</ProgressLabel>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
  <ProgressValue />
</Progress>
```

## Calendar

```tsx
import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar mode="single" selected={date} onSelect={setDate} />
```

## Sonner (toasts)

Mount once, e.g. in `app/layout.tsx`:

```tsx
import { Toaster } from "@/components/ui/sonner"

<Toaster />
```

Then trigger from anywhere:

```tsx
import { toast } from "sonner"

toast.success("Note saved")
toast.error("Failed to delete note")
```
