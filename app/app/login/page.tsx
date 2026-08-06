"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { GUEST_MODE_KEY } from "@/lib/notes-store";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-8 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Bible Notes</h1>
        <p className="mt-1 text-muted-foreground">
          Sign in to sync your notes across devices, or try it out as a guest.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button size="lg" onClick={() => signIn("github", { callbackUrl: "/" })}>
          Sign in with GitHub
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            localStorage.setItem(GUEST_MODE_KEY, "true");
            router.push("/");
          }}
        >
          Continue as Guest
        </Button>
      </div>
      <p className="max-w-xs text-center text-xs text-muted-foreground">
        Guest mode saves notes only in this browser — nothing is synced or sent anywhere. Great for
        trying the app out.
      </p>
    </div>
  );
}
