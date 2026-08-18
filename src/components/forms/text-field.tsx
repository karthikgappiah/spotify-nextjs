"use client";

import { type ComponentProps, useId } from "react";
import { Field, FieldError, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useFieldContext } from "@/src/library/forms/context";

type TextFieldProps = Omit<
  ComponentProps<typeof Input>,
  "id" | "name" | "value" | "onChange" | "onBlur"
> & {
  label: string;
};

export function TextField({ label, ...props }: TextFieldProps) {
  const field = useFieldContext<string>();
  const id = useId();
  const errorId = `${id}-error`;

  const { errors, isTouched, isValid } = field.state.meta;
  const isInvalid = isTouched && !isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={field.name}
        value={field.state.value}
        onChange={(event) => field.handleChange(event.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? errorId : undefined}
        {...props}
      />
      {isInvalid && (
        <FieldError
          id={errorId}
          errors={errors.map((error) =>
            typeof error === "string" ? { message: error } : error,
          )}
        />
      )}
    </Field>
  );
}
