import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

const email_schema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .pipe(z.email("Enter a valid email address"));

export const login_schema = z.object({
  email: email_schema,
  password: z.string().min(1, "Password is required"),
});

export const signup_schema = z.object({
  email: email_schema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/\d/, "Password must contain a number"),
});

export type LoginValues = z.infer<typeof login_schema>;
export type SignupValues = z.infer<typeof signup_schema>;

const default_values = { email: "", password: "" };

const validation_logic = revalidateLogic({
  mode: "blur",
  modeAfterSubmission: "change",
});

export const login_form_options = formOptions({
  defaultValues: default_values,
  validationLogic: validation_logic,
  validators: { onDynamic: login_schema },
});

export const signup_form_options = formOptions({
  defaultValues: default_values,
  validationLogic: validation_logic,
  validators: { onDynamic: signup_schema },
});
