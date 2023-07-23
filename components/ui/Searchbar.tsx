"use client";
import { GamesSearch } from "@/types";
import { getGamesSearch } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // We want to navigate to the /search page AND PASS THE searchTerm as a query
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("SEARCHBAR - handleSearch - e: ", e);

    router.push(`/search/${searchTerm}`);
  };

  return (
    <div className="">
      <form onSubmit={handleSearch} className="flex flex-row p-2 gap-2">
        <label htmlFor="search" className="w-64 border flex flex-row gap-y-0.5 bg-slate-800 ">
          <input
            type="text"
            name="search"
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
    </div>
  );
};

export default Searchbar;
