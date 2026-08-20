import { ThumbsUpIcon } from "@phosphor-icons/react/dist/ssr";

export default function LikedMusicPage() {
  return (
    <>
      <section className="flex items-end space-x-4">
        <div className="flex size-64 items-center justify-center rounded-4xl bg-muted">
          <ThumbsUpIcon size={64} weight="duotone" />
        </div>
        <div>
          <h2 className="font-semibold text-4xl">Liked Music</h2>
          <p className="text-muted-foreground text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>
      <section>{/* DATA TABLE */}</section>
    </>
  );
}
