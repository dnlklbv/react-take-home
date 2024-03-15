import { TGif } from "@/types";
import cx from "classnames";

type Props = {
  gif: TGif;
  isAuthenticated: boolean;
  isSaved: boolean;
  handleSave: (gifId: string) => void;
  handleUnsave: (gifId: string) => void;
};

export const Gif = ({
  gif,
  isAuthenticated,
  isSaved,
  handleSave,
  handleUnsave,
}: Props) => {
  return (
    <div key={gif.id} className="relative">
      <img
        className="h-32 w-32"
        src={gif.images.original.url}
        alt={gif.title}
      />
      {isAuthenticated && (
        <button
          onClick={() => (isSaved ? handleUnsave(gif.id) : handleSave(gif.id))}
          className={cx(
            "absolute bottom-1 right-1 bg-slate-200 w-8 h-8 rounded-full hover:opacity-85",
            { "opacity-40": !isSaved }
          )}
        >
          ❤️
        </button>
      )}
    </div>
  );
};
