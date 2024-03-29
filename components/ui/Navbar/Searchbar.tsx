"use client";
import { useCallback, useState, ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";

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
  const [searchTermValue, setSearchTermValue] = useState<string>("");

  const handleSearch = (searchTerm: string) => {
    // Conditional check to ensure the user inputs a valid search term containing either words, letters, numbers, or spaces
    const validCharacters = /^[A-Za-z0-9\s-]+$/;

    //IF SEARCH TERM IS EMPTY OR DOES NOT CONTAIN ALPHABET OR NUMBERS, ALERT USER
    if (!searchTerm || !validCharacters.test(searchTerm)) {
      // alert("Invalid Input - Must contain alphabet or numbers"); //may have to remove this alert and just leave it as a return to not search the term
      return;
    }

    // VALID INPUT - Navigate to the /search page and pass the searchTerm as a query
    router.push(`/dashboard/search/${searchTerm}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 500), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTermValue(e.target.value);
    // Call the debounced handleSearch function when the user stops typing for 1 second
    debouncedHandleSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-[75vw] md:max-w-[50vw] xl:max-w-[40vw] mx-auto">
      {/* <form onSubmit={handleSearch} className="max-w-1/2 flex flex-[50%] p-2 gap-2 min-w-[150px]X justify-center"> */}
      <form className="max-w-1/2 flex flex-[50%] p-2 gap-2 min-w-[150px]X justify-center">
        <label htmlFor="search" className="relative w-full flex flex-row transition-colors duration-500 ease-in-out group">
          <input
            type="text"
            name="search"
            placeholder="Search 850,000+ games"
            value={searchTermValue}
            onChange={handleChange}
            className="text-white min-w-full bg-gray-800 h-12 pl-10 rounded-full group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300 ease-in-out focus:outline-none truncate text-sm xsm:text-base"
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
