import { signIn, signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GifList } from "@/components/GifList";
import { TGif } from "@/types";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import Nav from "@/components/Nav";

type Props = {
  gifs: TGif[];
  saved: string[];
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const [gifs, saved] = await Promise.all([
    fetch(`${process.env.NEXT_APP_URL}/api/gif/feed`).then((res) => res.json()),
    fetch(`${process.env.NEXT_APP_URL}/api/gif/getSaved`, {
      method: "POST",
      body: JSON.stringify({ userEmail: session?.user?.email }),
    }).then((res) => res.json()),
  ]);

  return { props: { gifs, saved } };
};

export default function Home({ gifs, saved }: Props) {
  const session = useSession();
  const isAuthenticated = !!session?.data?.user;
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<TGif[] | null>(null);
  const [savedGifs, setSavedGifs] = useState(saved);
  const [filterSaved, setFilterSaved] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const gifsList = searchResults || gifs;
  const filteredGifs =
    savedGifs && filterSaved
      ? gifsList.filter((gif) => savedGifs.includes(gif.id))
      : gifsList;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleFilterSavedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSaved(e.target.checked);
  };

  const fetchSearchResults = async (searchValue: string) => {
    const res = await fetch(
      `/api/gif/search?q=${searchValue}`
    );
    const data = await res.json();
    setSearchResults(data);
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchSearchResults(debouncedSearchValue);
    } else {
      setSearchResults(null);
    }
  }, [debouncedSearchValue]);

  return (
    <main className={`flex min-h-screen flex-col items-center gap-8 p-20`}>
      <Nav />
      <div className="w-full flex gap-8">
        <input
          className="flex-grow h-14 bg-slate-800 p-8 rounded-md"
          placeholder="Search GIF"
          onChange={handleSearchChange}
        />
        {isAuthenticated && (
          <label className="flex items-center justify-center">
            <input
              className="w-6 h-6 rounded mr-4"
              type="checkbox"
              onChange={handleFilterSavedChange}
            />
            Show saved GIFs
          </label>
        )}
      </div>
      <GifList
        gifs={filteredGifs}
        savedGifs={savedGifs}
        setSavedGifs={setSavedGifs}
        isAuthenticated={isAuthenticated}
      />
    </main>
  );
}
