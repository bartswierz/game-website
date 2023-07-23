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
      <h2>Search Games: </h2>
      <div>
        {content && (
          <div className="">
            <ul className="flex flex-row flex-wrap gap-4">
              {content.results.map(({ slug, name, background_image }) => (
                <li key={slug}>
                  <GameLink slug={slug} name={name} background_image={background_image} />
                </li>
              ))}
            </ul>
            {/* // <div className="border">
              //   {game.background_image && (
              //     <div className="w-64 h-64">
              //       <Image
              //         src={game.background_image}
              //         width={200}
              //         height={200}
              //         alt="Game Card"
              //         className="w-full h-full object-cover"
              //       />
              //     </div>
              //   )}
              //   <p>Slug: {game.slug}</p>
              //   <p>name: {game.name}</p>
              //   <p>released: {game.released}</p>
              //   <p>rating: {game.rating}</p>
              //   <p>id: {game.id}</p>
              //   <p>rating_top: {game.rating_top}</p>
              //   <p>ratings_count: {game.ratings_count}</p>
              // </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
