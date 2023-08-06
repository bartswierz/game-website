"use client";
import Link from "next/link";
import { BsBoxArrowRight } from "react-icons/bs";
import { useState } from "react";

interface GameLinkBasicProps {
  id: number;
  name: string;
  games_count: number;
  games: {
    id: number;
    slug: string;
    name: string;
    added: number;
  }[];
}

const GameLinkBasic = ({ id, name, games_count, games }: GameLinkBasicProps) => {
  const [displayLimit, setDisplayLimit] = useState(4);
  // WE WILL DISPLAY THE FIRST THREE GAMES AND HIDE THE REST BEHIND A "SHOW MORE" BUTTON
  // const firstThreeGames = games.slice(0, 3);
  // let showLimit = 3;
  // const allGames = games.length;
  // console.log("games.length: ", games.length);
  // let showAll = games.length;
  const handleShowMore = () => {
    console.log("Show More Clicked");
    // showLimit = 3 ? games.length : 3;
    // console.log("showLimit after click: ", showLimit);
    displayLimit === 4 ? setDisplayLimit(games.length) : setDisplayLimit(4);
  };

  return (
    <div key={id} className="z-40 h-max max-w-[650px]">
      <h2 className="mb-6">
        <span className="text-3xl font-bold">{name}</span> <span className="text-gray-500 pl-1">{games_count}+ Games</span>
      </h2>

      {/* <div className="flex flex-row flex-wrap gap-4 mb-4 border"> */}
      {/* SIX GAMES FETCHES */}
      {/* bg-yellow-500 sm:bg-green-500 md:bg-blue-500 lg:bg-orange-500 xl:bg-red-500 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 m-4 max-w-[95%]">
        {games.slice(0, displayLimit).map(({ slug, name }) => (
          <Link
            href={`/games/${slug}`}
            key={slug}
            className="relative flex flex-grow justify-center text-center shadow-xl h-48 group cursor-pointer p-2"
          >
            <div className="pt-6">
              <p className="text-xl text-bold">{name}</p>
              {/* <p>GameID#{id}</p> */}
            </div>

            {/* GRADIENT BACKGROUND EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            {/* GAME NAME TEXT */}
            <p className="absolute flex justify-center items-center text-white  bottom-5 w-full">
              <BsBoxArrowRight size={40} color="gray" className="group-hover:fill-white" />
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
