export default async function PlaylistPage({
  params,
}: PageProps<"/home/playlists/[id]">) {
  const { id } = await params;

  return <h2 className="flex grow items-center justify-center">{id}</h2>;
}
