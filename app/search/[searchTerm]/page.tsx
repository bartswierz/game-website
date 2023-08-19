"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getGamesSearch, getAdvancedGamesSearch } from "@/utils";
import { useState, useEffect } from "react";
import { LoadMoreSearchGames } from "@/components/ui";
import { Combobox } from "@/components/ui/Shadcn/Combobox";

//TODO - ADD PARAMETERS AS OPTIONAL IF USER SELECTS FILTERS FROM COMBOBOX
// const SearchPage = ({ params }: { params: { searchTerm: string } }) => {
// const SearchPage = ({ params }: { params: { searchTerm: string; value?: string } }) => {
//  const GenrePage = async ({ params }: { params: { slug: string; query: { id: string } } }) => {
// const SearchPage = ({ params }: { params: { searchTerm: string; value?: string }; query: { query: string } }) => {
const SearchPage = ({ params }: { params: { searchTerm: string; query: { value: string } } }) => {
  // const SearchPage = ({ params }: { params: { searchTerm: string; value: string } }) => {
  // const { searchTerm, value } = params;
  // const { searchTerm, value } = params;
  // const { searchTerm, value } = params;
  const { searchTerm } = params;
  const value = params.query?.value;
  const [content, setContent] = useState<GamesSearch | null>(null);

  console.log("value search: ", value);
  console.log("params: ", params);
  // console.log("value search QUERY: ", query.query);

  //TODO - update
  useEffect(() => {
    // const fetchData = async (searchTerm: string) => {
    const fetchData = async () => {
      console.log("fetchData - searchTerm: ", searchTerm);
      //TODO - update getGamesSearch to accept extra optional parameters

      // value can be null or undefined if user only types in the search box
      const data: GamesSearch = await getAdvancedGamesSearch(searchTerm, value);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    // If we have a search term, fetch the data
    if (searchTerm) fetchData();
  }, [searchTerm, value]);

  // useEffect(() => {
  //   const fetchData = async (searchTerm: string) => {
  //     //TODO - update getGamesSearch to accept extra optional parameters
  //     const data: GamesSearch = await getGamesSearch(searchTerm);

  //     if (data) {
  //       setContent(data);
  //     } else throw new Error("No data returned from getGamesSearch");
  //   };

  //   // If we have a search term, fetch the data
  //   if (searchTerm) fetchData(searchTerm);
  // }, [searchTerm]);

  // MOVE SEARCH CONTENT DATA HERE
  return (
    // <div className="border p-2">
    <div className="text-white">
      {content && (
        <div>
          <Combobox searchTerm={searchTerm} />
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
