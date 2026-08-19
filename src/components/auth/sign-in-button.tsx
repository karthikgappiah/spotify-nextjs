"use client";

import { SpotifyLogoIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { auth_client } from "@/src/library/auth/auth-client";

type SignInButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onPress" | "children"
> & {
  children?: ReactNode;
};

export function SignInButton({
  children,
  isDisabled,
  variant = "outline",
  ...props
}: SignInButtonProps) {
  const [isPending, setIsPending] = useState(false);

  return (
    <Button
      type="button"
      variant={variant}
      isDisabled={isDisabled || isPending}
      onPress={async () => {
        setIsPending(true);

        const { error } = await auth_client.signIn.social({
          provider: "spotify",
          callbackURL: "/home",
        });

        // On success the browser leaves for Spotify, so only failures land here.
        if (error) setIsPending(false);
      }}
      {...props}
    >
      <SpotifyLogoIcon />
      <p>{isPending ? "Signing In..." : (children ?? "Sign In")}</p>
    </Button>
  );
}
