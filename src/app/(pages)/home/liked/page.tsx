import { ThumbsUpIcon } from "@phosphor-icons/react/dist/ssr";
import { columns, type Track } from "@/src/components/table/data-table-columns";
import { DataTable } from "@/src/components/ui/data-table";

const ARTISTS = [
  "Ariana Grande",
  "Camila Cabello",
  "Illenium",
  "The Weeknd",
  "Dua Lipa",
  "Tame Impala",
  "Frank Ocean",
  "Billie Eilish",
  "Daft Punk",
  "Tyler, the Creator",
];

const ALBUMS = [
  "Positions",
  "Camila",
  "Awake",
  "After Hours",
  "Future Nostalgia",
  "Currents",
  "Blonde",
  "Happier Than Ever",
  "Discovery",
  "IGOR",
];

const NAMES = [
  "Safety Net",
  "Shameless",
  "Lonely",
  "Blinding Lights",
  "Levitating",
  "The Less I Know the Better",
  "Nights",
  "Happier Than Ever",
  "One More Time",
  "EARFQUAKE",
];

function getData(): Promise<Track[]> {
  const data = Array.from({ length: 100 }, (_, index) => ({
    id: index.toString(16).padStart(8, "0"),
    name: NAMES[index % NAMES.length],
    artist: ARTISTS[index % ARTISTS.length],
    album: ALBUMS[index % ALBUMS.length],
    added_at: new Date(
      Date.UTC(2024, 0, 15) - index * 86_400_000,
    ).toISOString(),
  }));

  return Promise.resolve(data);
}

export default async function LikedMusicPage() {
  const data = await getData();

  return (
    <div className="space-y-4">
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
      <section>
        <DataTable columns={columns} data={data} />
      </section>
    </div>
  );
}
