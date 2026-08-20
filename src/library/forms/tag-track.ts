import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

// Tags are typed as a comma-separated list; smart playlists match on the parsed values.
export function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export const tagTrackSchema = z.object({
  tags: z
    .string()
    .refine((value) => parseTags(value).length > 0, "Add at least one tag"),
});

export type TagTrackValues = z.infer<typeof tagTrackSchema>;

export const tagTrackFormOptions = formOptions({
  defaultValues: { tags: "" },
  validationLogic: revalidateLogic({
    mode: "blur",
    modeAfterSubmission: "change",
  }),
  validators: { onDynamic: tagTrackSchema },
});
