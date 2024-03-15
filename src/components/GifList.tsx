import { TGif } from "@/types";
import { Gif } from "./Gif";

type Props = {
  gifs: TGif[];
  savedGifs: string[] | null;
  setSavedGifs: (savedGifs: string[]) => void;
  isAuthenticated: boolean;
};

export function GifList({
  gifs,
  savedGifs,
  setSavedGifs,
  isAuthenticated,
}: Props) {
  const handleSave = (gifId: string) => {
    fetch("http://localhost:3000/api/gif/save", {
      method: "POST",
      body: JSON.stringify({
        gifId,
      }),
    });

    setSavedGifs([...(savedGifs || []), gifId]);
  };

  const handleUnsave = (gifId: string) => {
    fetch("http://localhost:3000/api/gif/unsave", {
      method: "POST",
      body: JSON.stringify({
        gifId: gifId,
      }),
    });

    setSavedGifs((savedGifs || []).filter((id) => id !== gifId));
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
      {gifs.map((gif) => {
        return (
          <Gif
            key={gif.id}
            gif={gif}
            isAuthenticated={isAuthenticated}
            isSaved={!!savedGifs?.includes(gif.id)}
            handleSave={handleSave}
            handleUnsave={handleUnsave}
          />
        );
      })}
      {gifs.length === 0 && <p>No GIFs found</p>}
    </div>
  );
}
