"use client";
import { GamesSearch } from "@/types";
import { getGamesSearch } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
/*
TODO - add user interactivity such as form, search type options, etc.
TODO - BUILD FORM TO COLLECT USER INPUT AND PASS IT TO THE RAWG API UPON SUBMIT
REQUIREMENTS: FORM must specify the following:
  - Search Type (Game, Genre, Platform, etc.)
  - Search Term (ex. 'Action', 'Shooter', 'Playstation', etc.)
  - Search Limit (ex. 10, 20, 50, 100, etc.)
  - Search Order (ex. 'asc', 'desc')
  - Search By (ex. 'name', 'rating', 'released', etc.)
  - EXTRA: Search Page (ex. 1, 2, 3, etc.) 

  RAWG API CALL POSTMAN - https://api.rawg.io/api/games?key={{RAWG GAME API KEY #2}}&search=portal
  -using RAWG's param, 'search' passing the game name as the value

  -Upon submit, we will make the call to the RAWG API using the user's input depending on the search type

  -User searches a game only, then we will do a game search
*/

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [platformSearch, setpPlatformSearch] = useState<string>("");
  // const [genreSearch, setGenreSearch] = useState<string>("");
  // const [request, setRequest] = useState<string>("");
  const [content, setContent] = useState<GamesSearch | null>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SEARCHBAR - handleSearch - e: ", e);

    // ONCE
    const fetchedGamesData: GamesSearch = await getGamesSearch(searchTerm);

    if (!fetchedGamesData) {
      throw new Error("No content returned from getGamesSearch()");
    }

    setContent(fetchedGamesData);
    // return content;
  };

  //ADD useEffect to check for content changes, whenever user hits submit, we will make the call to the RAWG API which should return the game data and update the content, causing our useEffect to fire off again, and update the content

  return (
    <div className="border p-2">
      <h2>Search Games: </h2>
      <form onSubmit={handleSearch} className="flex flex-row p-2 gap-2">
        <label htmlFor="search" className="w-64 border flex flex-row gap-y-0.5 bg-slate-800 ">
          <input
            type="text"
            placeholder="Search 850,000+ games"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 bg-slate-800 "
          />
        </label>
        <button type="submit" className="bg-blue-500 rounded-full px-4 py-2 hover:bg-blue-600 active:bg-blue-700">
          <BiSearch size={18} />
        </button>
      </form>
      <div>
        Game Search:{" "}
        {searchTerm ? (
          <span>
            https://api.rawg.io/api/games?key={process.env.RAWG_API_KEY}&search={searchTerm}
          </span>
        ) : (
          "No text yet..."
        )}
      </div>

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

export default Searchbar;
