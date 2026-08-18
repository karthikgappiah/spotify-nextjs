"use client";

import { createFormHook } from "@tanstack/react-form";
import { SubmitButton } from "@/src/components/forms/submit-button";
import { TextField } from "@/src/components/forms/text-field";
import { fieldContext, formContext } from "@/src/library/forms/context";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubmitButton },
});
