import { SpotifyLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/src/components/ui/button";
import { ModeToggle } from "@/src/components/ui/mode-toggle";

export default function LandingPage() {
  return (
    <main className="grow">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-1">
          <SpotifyLogoIcon size={32} />
          <h1 className="text-xl">Spotify</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant="outline" type="button">
            <p>Sign In</p>
          </Button>
        </div>
      </header>
    </main>
  );
}
