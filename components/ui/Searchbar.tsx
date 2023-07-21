"use client";
import { GameSearch } from "@/types";
import { useState, useEffect } from "react";
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
*/

const Searchbar = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SEARCHBAR - handleSearch - e: ", e);

    // ONCE
  };

  return (
    <div className="border">
      <h2>Searchbar: </h2>
      <form onSubmit={handleSearch} className="flex flex-col p-2 gap-2">
        <label htmlFor="search" className="w-64- border flex flex-col gap-y-0.5">
          Game:
          <input
            type="text"
            placeholder="Portal"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-slate-800 w-96"
          />
        </label>

        <button type="submit" className="bg-blue-500 rounded-xl px-4 py-2 hover:bg-blue-600 active:bg-blue-700">
          Submit
        </button>
      </form>
      {/* <div>Game: {searchText ? searchText : "No text yet..."}</div> */}
    </div>
  );
};

export default Searchbar;
