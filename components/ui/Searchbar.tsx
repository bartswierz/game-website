"use client";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
/*
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
    <div className="max-w-[50vw] w-full mx-auto ">
      <form onSubmit={handleSearch} className="max-w-1/2 flex flex-[50%] p-2 gap-2 w-full- min-w-[150px] justify-center">
        <label htmlFor="search" className="relative w-full flex flex-row transition-colors duration-500 ease-in-out group">
          <input
            type="text"
            name="search"
            placeholder="Search 850,000+ games"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-white min-w-full bg-gray-800 h-12 pl-10 rounded-full group-hover:bg-white group-hover:text-gray-900"
          />
          <button type="submit" className="absolute rounded-full h-12 px-4 py-2 left-[0%] bottom-[0%]">
            <BiSearch size={20} color="gray" />
          </button>
        </label>
      </form>
    </div>
  );
};

export default Searchbar;
