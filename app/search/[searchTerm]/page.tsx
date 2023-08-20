"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getGamesSearch, getAdvancedGamesSearch } from "@/utils";
import { useState, useEffect } from "react";
import { LoadMoreSearchGames } from "@/components/ui";
import { Combobox } from "@/components/ui/Shadcn/Combobox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
const SearchPage = ({ params }: { params: { searchTerm: string } }) => {
  // const router = useRouter();
  const { searchTerm } = params;
  // const value = params.query?.value;
  const [content, setContent] = useState<GamesSearch | null>(null);
  // Collects our value inside query passed from Combobox
  const searchParams = useSearchParams();
  const searchOrdering = searchParams.get("ordering");
  const searchPlatforms = searchParams.get("platforms");
  const [platforms, setPlatforms] = useState(searchOrdering);
  const [ordering, setOrdering] = useState(searchPlatforms);
  // const [platforms, setPlatforms] = useState(router.query.platforms);
  // const [ordering, setOrdering] = useState(router.query.ordering);
  console.log("platforms: ", platforms, "and ordering: ", ordering);

  // Update state when query parameters change
  // useEffect(() => {
  //   setPlatforms(router.platforms || null);
  //   setOrdering(router.ordering || null);
  // }, [router.query.platform, router.query.ordering]);
  useEffect(() => {
    console.log("searchOrdering passed: ", searchOrdering);
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  useEffect(() => {
    console.log("searchPlatforms passed: ", searchPlatforms);
    setPlatforms(searchPlatforms);
  }, [searchPlatforms]);
  // const [ordering, setOrdering] = useState("");
  // const [platforms, setPlatforms] = useState("");
  // if (searchOrdering) setOrdering(searchOrdering);
  // if (searchPlatforms) setPlatforms(searchPlatforms);
  // const [ordering, setOrdering] = useState("");
  //Set at the beginning, if user doesnt choose any filters, these will be the default
  //TODO - ordering or platforms is being reset because of the useState, sometimes they arent passed, we don't want to overwrite it with null
  // const [searchParameters, setSearchParameters] = useState({
  //   searchTerm: searchTerm,
  //   ordering: searchOrdering,
  //   platforms: searchPlatforms,
  // });
  const [searchParameters, setSearchParameters] = useState({});

  console.log("searchParameters: ", searchParameters);
  // const [searchParameters, setSearchParameters] = useState({ searchTerm: searchTerm, ordering: "", platforms: "" });
  // console.log(`Search Page -\n ${searchTerm}: ${searchTerm},\n ordering: ${searchOrdering},\n platforms: ${searchPlatforms}`);
  // const paramsObj = {
  //   searchTerm: searchTerm,
  //   searchOrdering: searchOrdering,
  //   platforms: searchPlatforms,
  // };

  //If searchPlatforms isnt null, that means user chose, update searchParameters.platforms
  // useEffect(() => {
  //   // console.log("searchParameters - searchTerm given: ", searchTerm);
  //   if (!searchTerm) return;
  //   setSearchParameters({ ...searchParameters, searchTerm: searchTerm });
  // }, [searchTerm]);

  //If searchOrdering isnt null, that means user chose, update searchParameters.searchOrdering
  // useEffect(() => {
  //   // console.log("searchParameters - searchOrdering given: ", searchOrdering);
  //   if (!searchOrdering) return;

  //   if (searchOrdering === "") {
  //     setSearchParameters({ ...searchParameters, ordering: null });
  //     return;
  //   }

  //   setSearchParameters({ ...searchParameters, ordering: searchOrdering });
  //   // console.log("searchParameters update: ", searchParameters);
  // }, [searchOrdering]);

  // //If searchPlatforms isnt null, that means user chose, update searchParameters.platforms
  // useEffect(() => {
  //   // console.log("searchParameters - searchPlatforms given: ", searchPlatforms);
  //   if (!searchPlatforms) return;

  //   if (searchOrdering === "") {
  //     setSearchParameters({ ...searchParameters, platforms: null });
  //     return;
  //   }

  //   setSearchParameters({ ...searchParameters, platforms: searchPlatforms });
  //   // console.log("searchParameters update: ", searchParameters);
  // }, [searchPlatforms]);

  // useEffect(() => {
  //   console.log("UPDATE: ", searchParameters);
  // }, [searchParameters]);
  // console.log("paramsObj: ", paramsObj);
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
    // fetchData();
  }, [searchTerm, searchOrdering, searchPlatforms]);
  // }, [searchParameters]); //If any of the searchParamters change, refetch data

  // MOVE SEARCH CONTENT DATA HERE
  return (
    // <div className="border p-2">
    <div className="text-white">
      {content && (
        <div>
          {/* //TODO pass orderingOptions */}
          <div className="text-3xl text-green-500">RESULTS: {content.count}</div>

          <div className="flex gap-4 mb-4">
            <Combobox searchTerm={searchTerm} type="ordering" />
            <Combobox searchTerm={searchTerm} type="platforms" />
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
