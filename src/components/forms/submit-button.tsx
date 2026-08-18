"use client";

import { useSelector } from "@tanstack/react-form";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/src/components/ui/button";
import { useFormContext } from "@/src/library/forms/context";

type SubmitButtonProps = Omit<
  ComponentProps<typeof Button>,
  "type" | "children"
> & {
  children: ReactNode;
  pendingLabel?: ReactNode;
};

export function SubmitButton({
  children,
  pendingLabel,
  isDisabled,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();

  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <Button type="submit" isDisabled={isDisabled || isSubmitting} {...props}>
      {isSubmitting ? (pendingLabel ?? children) : children}
    </Button>
  );
}
