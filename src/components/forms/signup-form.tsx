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
  FieldSeparator,
} from "@/src/components/ui/field";
import { useAppForm } from "@/src/library/forms/app-form";
import { signup_form_options } from "@/src/library/forms/auth";
import { cn } from "@/src/styles/utilities";

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const form = useAppForm({
    ...signup_form_options,
    onSubmit: ({ value }) => {
      // TODO: replace with real sign-up logic.
      console.log("signup", value);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
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
              Already have an account? <Link href="/auth/login">Log in</Link>
            </FieldDescription>
          </div>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                className="placeholder:text-sm"
                required
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.TextField
                label="Password"
                type="password"
                autoComplete="new-password"
                required
              />
            )}
          </form.AppField>
          <Field>
            <form.AppForm>
              <form.SubmitButton pendingLabel="Signing Up...">
                Sign Up
              </form.SubmitButton>
            </form.AppForm>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button">
              <AppleLogoIcon />
              Sign up with Apple
            </Button>
            <Button variant="outline" type="button">
              <GoogleLogoIcon />
              Sign up with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By signing up, you agree to our{" "}
        <Link href="/legal/terms-of-service">Terms of Service</Link> and{" "}
        <Link href="/legal/privacy-policy">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
