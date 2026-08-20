"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import { useAppForm } from "@/src/library/forms/app-form";
import { parseTags, tagTrackFormOptions } from "@/src/library/forms/tag-track";
import { useIsMobile } from "@/src/library/hooks/use-mobile";
import type { Track } from "@/src/library/spotify/schema";
import { cn } from "@/src/styles/utilities";

type TagTrackDialogProps = {
  track: Track;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

// Dialog on desktop, drawer on mobile — both render the same form.
export function TagTrackDialog({
  track,
  isOpen,
  onOpenChange,
}: TagTrackDialogProps) {
  const isMobile = useIsMobile();
  const description = `Add tags to "${track.name}" so smart playlists can pick it up.`;

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Tag track</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <TagTrackForm
            className="px-4"
            track={track}
            onSaved={() => onOpenChange(false)}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="sm:max-w-[425px]"
    >
      <DialogHeader>
        <DialogTitle>Tag track</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <TagTrackForm track={track} onSaved={() => onOpenChange(false)} />
    </Dialog>
  );
}

type TagTrackFormProps = {
  className?: string;
  track: Track;
  onSaved: () => void;
};

function TagTrackForm({ className, track, onSaved }: TagTrackFormProps) {
  const form = useAppForm({
    ...tagTrackFormOptions,
    onSubmit: ({ value }) => {
      // TODO: replace with the real tag mutation.
      console.log("tag track", { id: track.id, tags: parseTags(value.tags) });
      onSaved();
    },
  });

  return (
    <form
      noValidate
      className={cn("grid items-start gap-6", className)}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.AppField name="tags">
        {(field) => (
          <field.TextField
            label="Tags"
            placeholder="high energy, instrumental"
            autoComplete="off"
          />
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton pendingLabel="Saving...">
          Save tags
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
