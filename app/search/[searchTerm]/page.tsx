"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getGamesSearch, getAdvancedGamesSearch } from "@/utils";
import { useState, useEffect } from "react";
import { LoadMoreSearchGames } from "@/components/ui";
import { Combobox } from "@/components/ui/Shadcn/Combobox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ComboboxOrdering, ComboboxPlatforms } from "@/components/ui";

//TODO - ADD PARAMETERS AS OPTIONAL IF USER SELECTS FILTERS FROM COMBOBOX
/*
On combobox change:
1. value will be set to value
2. find way to pass this value being rerouted to the SearchPage from the Combobox file
*/
// const SearchPage = ({ params }: { params: { searchTerm: string } }) => {
// const SearchPage = ({ params }: { params: { searchTerm: string; value?: string } }) => {
//  const GenrePage = async ({ params }: { params: { slug: string; query: { id: string } } }) => {
// const SearchPage = ({ params }: { params: { searchTerm: string; value?: string }; query: { query: string } }) => {
// const SearchPage = ({ params }: { params: { searchTerm: string; query?: { value: string } } }) => {
const SearchPage = async ({ params }: { params: { searchTerm: string } }) => {
  // const router = useRouter();
  const { searchTerm } = params;
  // console.log("params: ", params);
  const gameName = searchTerm.replace(/%20/g, " ");
  // const value = params.query?.value;
  const [content, setContent] = useState<GamesSearch | null>(null);
  // Collects our value inside query passed from Combobox
  const searchParams = useSearchParams();
  // console.log("searchParams: ", searchParams);
  const searchOrdering = searchParams.get("ordering");
  const searchPlatforms = searchParams.get("platforms");
  const [platforms, setPlatforms] = useState<string | null>(searchPlatforms);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);

  console.log("platforms: ", platforms, "and ordering: ", ordering);

  //UPDATING ORDERING STATE
  useEffect(() => {
    console.log("searchOrdering passed: ", searchOrdering);

    setOrdering(searchOrdering);
  }, [searchOrdering]);

  //UPDATING PLATFORMS STATE
  useEffect(() => {
    console.log("searchPlatforms passed: ", searchPlatforms);
    // If null we will not update the state
    if (!searchPlatforms) return;

    // User selected a platform, we will update the state so it can be passed to the combobox
    setPlatforms(searchPlatforms);
  }, [searchPlatforms]);

  const [searchParameters, setSearchParameters] = useState({});

  // console.log("searchParameters: ", searchParameters);
  //TODO - update
  useEffect(() => {
    // const fetchData = async (searchTerm: string) => {
    const fetchData = async () => {
      // console.log("fetchData - searchTerm: ", searchTerm);

      // value can be null or undefined if user only types in the search box
      const data: GamesSearch = await getAdvancedGamesSearch(searchTerm, searchOrdering, searchPlatforms);
      // const data: GamesSearch = await getAdvancedGamesSearch(paramsObj);
      // const data: GamesSearch = await getAdvancedGamesSearch(searchParameters);

      // setContent(data);
      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    // If we have a search term, fetch the data
    if (searchTerm) fetchData();
  }, [searchTerm, searchOrdering, searchPlatforms]);
  // }, [searchParameters]); //If any of the searchParamters change, refetch data

  // MOVE SEARCH CONTENT DATA HERE
  return (
    // <div className="border p-2">
    <div className="text-white">
      {content && (
        <div>
          {/* //TODO pass orderingOptions */}
          <div className="text-3xl font-semibold ">
            <span className="capitalize">{gameName}</span> <span className="text-xl text-gray-600">{content.count} results found</span>
          </div>

          <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start sm:flex-row gap-4 mb-4">
            {/* <Combobox searchTerm={searchTerm} type="ordering" handleOrdering={handleOrdering} /> */}
            {/* TODO - create an object passed to each combo that will update */}
            {/* <Combobox searchTerm={searchTerm} type="ordering" platforms={platforms} ordering={null} />
            <Combobox searchTerm={searchTerm} type="platforms" ordering={ordering} platforms={null} /> */}
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
      {/* {searchTerm && <LoadMoreSearchGames secondPage={content.next} />} */}
    </div>
  );
};

export default SearchPage;
