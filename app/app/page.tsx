import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const noteTitle = "Note Title => How to Cope";
  const noteVerse = "Note Verse => Proverbs 10:12";
  const noteAction = "View Note";
  const noteContent =
    "Note Content => Coping with stress and anxiety can be challenging, but there are several strategies that can help. Some effective techniques include practicing mindfulness, engaging in regular physical activity, maintaining a healthy diet, getting enough sleep, and seeking support from friends, family, or mental health professionals. It's important to find what works best for you and to be patient with yourself as you navigate through difficult times.";
  const noteFooter =
    "Note Footer => This is a note about coping with stress and anxiety.";

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>This is the Note layout for Note Cards</h1>
        <Card size="lg" className="w-full">
          <CardHeader>
            <CardTitle>{noteTitle}</CardTitle>
            <CardDescription>{noteVerse}</CardDescription>
            <CardAction>{noteAction}</CardAction>
          </CardHeader>
          <CardContent>
            <p>{noteContent}</p>
          </CardContent>
          <CardFooter>
            <p>{noteFooter}</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
