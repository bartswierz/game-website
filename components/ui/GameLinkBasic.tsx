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
  const [displayLimit, setDisplayLimit] = useState(3);
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
    displayLimit === 3 ? setDisplayLimit(games.length) : setDisplayLimit(3);
  };

  return (
    <div key={id} className="z-40 w-full">
      <h2 className="mb-6">
        <span className="text-3xl font-bold">{name}</span> <span className="text-gray-500 pl-1">{games_count}+ Games</span>
      </h2>

      {/* <div className="flex flex-row flex-wrap gap-4 mb-4 border"> */}
      {/* SIX GAMES FETCHES */}
      <div className="grid grid-cols-2 gap-4 mb-4 border">
        {games.slice(0, displayLimit).map(({ id, slug, name }) => (
          <Link
            href={`/games/${slug}`}
            key={slug}
            className="relative flex flex-col shadow-xl w-56 h-48 h-64- group cursor-pointer p-2"
          >
            <div className="text-center pt-6">
              <p className="text-xl text-bold">{name}</p>
              <p>id: {id}</p>
            </div>

            {/* GRADIENT BACKGROUND EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

            {/* GAME NAME TEXT */}
            <p className="absolute flex  justify-center items-center text-white  bottom-5 w-full text-center ">
              <BsBoxArrowRight size={40} color="gray" className="group-hover:fill-white" />
            </p>
          </Link>
        ))}
        {/* SHOW MORE BUTTON */}
        {/* <div className="border flex items-end"> */}
        <button
          className="border rounded-lg justify-end bg-gray-700 mx-auto w-full hover:bg-gray-600 cursor-pointer"
          onClick={handleShowMore}
        >
          {displayLimit === 3 ? "Show More" : "Show Less"}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default GameLinkBasic;
