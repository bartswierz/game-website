"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getGamesSearch } from "@/utils";
import { useState, useEffect } from "react";

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
      {/* <h2>Results for: {searchTerm}</h2> */}
      {content && (
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 px-4 md:px-0 gap-5">
            {content.results.map(({ slug, name, background_image }) => (
              <li key={slug} className="h-64 p-4">
                <GameLink slug={slug} name={name} background_image={background_image} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
