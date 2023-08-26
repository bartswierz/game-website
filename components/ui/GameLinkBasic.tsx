"use client";
import Link from "next/link";
import { BsBoxArrowRight } from "react-icons/bs";
import { useState } from "react";
import { getPageTitle } from "@/utils/utils";

interface GameLinkBasicProps {
  id: number;
  name: string;
  games_count: number;
  page: "platforms" | "developer";
  games: {
    id: number;
    slug: string;
    name: string;
    added: number;
  }[];
}

// INDIVIDUAL PLATFORM GAME - Contains Platform Name, Game Count, and 6 Games with Links
const GameLinkBasic = ({ id, name, games_count, games, page }: GameLinkBasicProps) => {
  const [displayLimit, setDisplayLimit] = useState(4);

  // WE WILL DISPLAY THE FIRST THREE GAMES AND HIDE THE REST BEHIND A "SHOW MORE" BUTTON
  const handleShowMore = () => {
    displayLimit === 4 ? setDisplayLimit(games.length) : setDisplayLimit(4);
  };

  //CREATE LINK TO INDIVIDUAL PLATFORM PAGE i.e. /platforms/pc?id=4
  const handleLink = (id: number) => {
    //TODO - CHECK IF PLATFORM OR DEVELOPER PAGE AND RETURN CORRECT LINK
    // const formattedName: string = await getPageTitle(String(id));
    const platformNameSlug: string = getPageTitle(id); //xbox-series-x
    if (page === "platforms") {
      const link = { pathname: `/platforms/${platformNameSlug}`, query: { id: id } };
      // console.log("link: ", link);
      return link;
    } else if (page === "developer") {
      // const link = { pathname: `/developers/${platformNameSlug}`, query: { id: id } };
      const link = { pathname: `/developers/`, query: { id: id } };
      // console.log("link: ", link);
      return link;
    } else throw new Error("Invalid page type passed to GameLinkBasic"); //TODO - currently it works when we LOAD INTO THE PAGE, HOWEVER, when we scroll down to load more games, it throws an error - TODO - NEED TO CREATE A LoadMoreDeveloperGames component. THIS ERROR ONLY HAPPENS FOR DEVELOPERS, PLATFORMS WORKS - needs to duplicate the LoadMorePlatformGames component into dev component
  };

  return (
    <div key={id} className="z-40 h-max max-w-[650px]">
      {/* HEADER */}
      <h2 className="mb-6">
        {/* <div className="flex justify-center- items-center- group gap-x-1.5"> */}
        <Link
          href={handleLink(id)}
          className="text-3xl font-bold cursor-pointer flex justify-start items-center gap-x-1 group w-max duration-300"
        >
          <span className="group-hover:underline">{name}</span>
          <BsBoxArrowRight size={26} color="gray" className="group-hover:fill-white transition-colors" />
        </Link>
        <span className="text-gray-500 pl-1">{games_count}+ Games</span>
      </h2>

      {/* SIX GAMES FETCHES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 m-4 max-w-[95%]">
        {games.slice(0, displayLimit).map(({ slug, name }) => (
          <Link
            href={`/games/${slug}`}
            key={slug}
            className="relative flex flex-grow justify-center text-center shadow-xl h-48 group cursor-pointer p-2"
          >
            <div className="pt-6">
              <p className="text-xl text-bold">{name}</p>
            </div>

            {/* GRADIENT BACKGROUND EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            {/* GAME NAME TEXT */}
            <p className="absolute flex justify-center items-center text-white  bottom-5 w-full">
              <BsBoxArrowRight size={40} color="gray" className="group-hover:fill-white transition-colors ease-in-out" />
            </p>
          </Link>
        ))}
        {/* SHOW MORE BUTTON */}
        <div className="sm:col-span-2">
          <button
            className={`border rounded-lg bg-gray-800 w-full h-8 hover:bg-gray-600 cursor-pointer ${
              displayLimit !== 4 ? "col-span-2" : ""
            }`}
            onClick={handleShowMore}
          >
            {displayLimit === 4 ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLinkBasic;
