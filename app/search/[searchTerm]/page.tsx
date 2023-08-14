"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getGamesSearch } from "@/utils";
import { useState, useEffect } from "react";
import { LoadMoreSearchGames } from "@/components/ui";
import { Combobox } from "@/components/ui/Shadcn/Combobox";
const SearchPage = ({ params }: { params: { searchTerm: string } }) => {
  const { searchTerm } = params;
  const [content, setContent] = useState<GamesSearch | null>(null);

  useEffect(() => {
    const fetchData = async (searchTerm: string) => {
      const data: GamesSearch = await getGamesSearch(searchTerm);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    // If we have a search term, fetch the data
    if (searchTerm) fetchData(searchTerm);
  }, [searchTerm]);

  // MOVE SEARCH CONTENT DATA HERE
  return (
    // <div className="border p-2">
    <div className="text-white">
      {content && (
        <div>
          {/* <Combobox /> */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-1">
            {content.results.map(({ slug, name, background_image }) => (
              <li key={slug} className="h-64 p-2">
                <GameLink slug={slug} name={name} background_image={background_image} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* LOADING ICON AT THE BOTTOM */}
      {content?.next && <LoadMoreSearchGames secondPage={content.next} />}
      {/* {searchTerm && <LoadMoreSearchGames secondPage={content.next} />} */}
    </div>
  );
};

export default SearchPage;
