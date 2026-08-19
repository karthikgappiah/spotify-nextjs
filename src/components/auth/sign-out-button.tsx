"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { auth_client } from "@/src/library/auth/auth-client";

type SignOutButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onPress" | "children"
> & {
  children?: ReactNode;
};

export function SignOutButton({
  children,
  isDisabled,
  variant = "outline",
  ...props
}: SignOutButtonProps) {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  return (
    <Button
      type="button"
      variant={variant}
      isDisabled={isDisabled || isPending}
      onPress={async () => {
        setIsPending(true);

        await auth_client.signOut();

        router.replace("/");
        router.refresh();
      }}
      {...props}
    >
      <p>{isPending ? "Signing Out..." : (children ?? "Sign Out")}</p>
    </Button>
  );
}
