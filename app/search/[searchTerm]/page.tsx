"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getAdvancedGamesSearch } from "@/utils";
import { useState, useEffect } from "react";
import { LoadMoreSearchGames } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { ComboboxOrdering, ComboboxPlatforms } from "@/components/ui";

const SearchPage = ({ params }: { params: { searchTerm: string } }) => {
  const searchParams = useSearchParams();
  const { searchTerm } = params;
  const [content, setContent] = useState<GamesSearch | null>(null);
  const gameName = searchTerm.replace(/%20/g, " ");

  // Collects our value inside query passed from Combobox
  const searchOrdering = searchParams.get("ordering");
  const searchPlatforms = searchParams.get("platforms");
  const [platforms, setPlatforms] = useState<string | null>(searchPlatforms);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);

  //UPDATING ORDERING STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  //UPDATING PLATFORMS STATE FROM COMBOBOX, WE WILL PASS IT TO THE COMBOBOX TO BE READY FOR THE NEXT FILTER SEARCH
  useEffect(() => {
    // User selected a platform, we will update the state so it can be passed to the combobox
    setPlatforms(searchPlatforms);
  }, [searchPlatforms]);

  useEffect(() => {
    const fetchData = async () => {
      // value can be null or undefined if user only types in the search box
      const data: GamesSearch = await getAdvancedGamesSearch(searchTerm, searchOrdering, searchPlatforms);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    // If we have a search term, fetch the data
    if (searchTerm) fetchData();
  }, [searchTerm, searchOrdering, searchPlatforms]);

  // MOVE SEARCH CONTENT DATA HERE
  return (
    <div className="text-white">
      {content && (
        <div>
          <div className="text-3xl font-semibold ">
            <span className="capitalize">{gameName}</span> <span className="text-xl text-gray-600">{content.count} results found</span>
          </div>

          <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start sm:flex-row gap-4 mb-4">
            <ComboboxOrdering searchTerm={searchTerm} platforms={platforms} />
            <ComboboxPlatforms searchTerm={searchTerm} ordering={ordering} />
          </div>

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
    </div>
  );
};

export default SearchPage;
