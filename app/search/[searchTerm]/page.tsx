"use client";
import { GameLink } from "@/components/ui";
import { GamesSearch } from "@/types";
import { getGamesSearch } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

const SearchPage = ({ params }: { params: { searchTerm: string } }) => {
  const { searchTerm } = params;
  console.log("searchPage params: ", params);
  console.log("searchPage search: ", searchTerm);

  const [content, setContent] = useState<GamesSearch | null>(null);
  console.log("Search Page Content: ", content);

  useEffect(() => {
    const fetchData = async (searchTerm: string) => {
      const data: GamesSearch = await getGamesSearch(searchTerm);
      // const data: GamesSearch = await getGamesSearch(searchTerm);

      if (data) {
        // console.log("data: ", data);
        setContent(data);
      } else throw new Error("No data returned from getGamesSearch");
    };

    // If we have a search term, fetch the data
    if (searchTerm) fetchData(searchTerm);
  }, [searchTerm]);

  // MOVE SEARCH CONTENT DATA HERE
  return (
    // <div className="border p-2">
    <div className="text-white">
      {/* <h2>Results for: {searchTerm}</h2> */}
      <div>
        {content && (
          <div className="">
            <ul className="flex flex-row flex-wrap gap-5">
              {content.results.map(({ slug, name, background_image }) => (
                <li key={slug}>
                  <GameLink slug={slug} name={name} background_image={background_image} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
