"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { GUEST_MODE_KEY } from "@/lib/notes-store";

export function AccountMenu({
  isAuthenticated,
  isGuest,
}: {
  isAuthenticated: boolean;
  isGuest: boolean;
}) {
  const router = useRouter();
  const [useGitHub, setUseGitHub] = useState(isAuthenticated);
  const switchMatchesCurrent = useGitHub === isAuthenticated;

  function handleAction() {
    if (switchMatchesCurrent) {
      if (useGitHub) {
        signOut({ callbackUrl: "/login" });
      } else {
        localStorage.removeItem(GUEST_MODE_KEY);
        router.push("/login");
      }
      return;
    }

    if (useGitHub) {
      signIn("github", { callbackUrl: "/" });
    } else {
      localStorage.setItem(GUEST_MODE_KEY, "true");
      signOut({ callbackUrl: "/" });
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="icon-lg" aria-label="Account">
            <UserIcon className="size-5" />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-64">
        <div className="flex flex-col gap-4 p-1">
          <p className="text-xs text-muted-foreground">
            {isAuthenticated
              ? "Signed in with GitHub"
              : isGuest
                ? "Demo mode — notes saved to this browser only"
                : "Not signed in"}
          </p>
          <label className="flex items-center justify-center gap-3 text-sm">
            <span className={!useGitHub ? "font-medium" : "text-muted-foreground"}>Demo</span>
            <Switch checked={useGitHub} onCheckedChange={setUseGitHub} aria-label="Sign-in mode" />
            <span className={useGitHub ? "font-medium" : "text-muted-foreground"}>GitHub</span>
          </label>
          <Button size="sm" onClick={handleAction}>
            {switchMatchesCurrent
              ? useGitHub
                ? "Sign out"
                : "Exit demo"
              : useGitHub
                ? "Sign in with GitHub"
                : "Switch to Demo"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
