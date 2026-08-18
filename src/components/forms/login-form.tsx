"use client";

import {
  AppleLogoIcon,
  GoogleLogoIcon,
  TidalLogoIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/styles/utilities";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <TidalLogoIcon className="size-6" />
              </div>
              <span className="sr-only">TODO</span>
            </Link>
            <h1 className="font-bold text-xl">Welcome to TODO</h1>
            <FieldDescription>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup">Sign up</Link>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className={"placeholder:text-sm"}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">Log In</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
              <AppleLogoIcon />
              Log in with Apple
            </Button>
            <Button variant="outline" type="button">
              <GoogleLogoIcon />
              Log in with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By logging in, you agree to our{" "}
        <Link href="/legal/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/legal/privacy-policy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
