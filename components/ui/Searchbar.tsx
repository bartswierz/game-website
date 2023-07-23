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
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex p-2 gap-2 w-full justify-center">
        {/* <label htmlFor="search" className="w-64 border flex flex-row gap-y-0.5 "> */}
        <label htmlFor="search" className="relative  w-3/4 flex flex-row transition-colors duration-500 ease-in-out">
          <input
            type="text"
            name="search"
            placeholder="Search 850,000+ games"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-full bg-slate-800 w-64 h-14 pl-10 rounded-full border hover:placeholder:text-white "
            // className="min-w-full bg-slate-800 w-64 rounded-full border hover:placeholder:text-white "
          />
          <button type="submit" className="absolute rounded-full h-14 px-4 py-2left-[0%] bottom-[0%]">
            <BiSearch size={20} className="hover:red" />
          </button>
        </label>
      </form>
    </div>
  );
};

export default Searchbar;
