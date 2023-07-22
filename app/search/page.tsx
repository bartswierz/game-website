"use client";
import { GamesSearch } from "@/types";
import { getGamesSearch } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
// TODO - pass a query as the game search term - we will then do the fetch in HERE
const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  console.log("searchTerm PASSED FROM SEARCHBAR: ", searchTerm);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [platformSearch, setpPlatformSearch] = useState<string>("");
  // const [genreSearch, setGenreSearch] = useState<string>("");
  // const [request, setRequest] = useState<string>("");
  const [content, setContent] = useState<GamesSearch | null>(null);

  useEffect(() => {
    const fetchGamesSearch = async (searchTerm: string) => {
      const data: GamesSearch = await getGamesSearch(searchTerm);

      if (data) {
        // console.log("data: ", data);
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    // If we have a search term, fetch the data
    if (searchTerm) fetchGamesSearch(searchTerm);
  }, [searchTerm]);
  // const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("SEARCHBAR - handleSearch - e: ", e);

  //   // ONCE
  //   const fetchedGamesData: GamesSearch = await getGamesSearch(searchTerm);

  //   if (!fetchedGamesData) {
  //     throw new Error("No content returned from getGamesSearch()");
  //   }

  //   setContent(fetchedGamesData);
  //   // return content;
  // };
  // MOVE SEARCH CONTENT DATA HERE
  return (
    // <div className="border p-2">
    <div className="text-white">
      {/* <h2>Search Games: </h2> */}
      <div>
        {content ? (
          <div className="flex flex-row flex-wrap gap-2">
            {content.results.map((game) => (
              <div className="border">
                {game.background_image && (
                  <div className="w-64 h-64">
                    <Image
                      src={game.background_image}
                      width={200}
                      height={200}
                      alt="Game Card"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p>{game.slug}</p>
                <p>{game.name}</p>
                <p>{game.released}</p>
                <p>{game.rating}</p>
                <p>{game.id}</p>
                <p>{game.rating_top}</p>
                <p>{game.ratings_count}</p>
                <p>{game.clip && game.clip}</p>
              </div>
            ))}
          </div>
        ) : (
          "No data to display yet..."
        )}
      </div>
    </div>
  );
};

export default SearchPage;
