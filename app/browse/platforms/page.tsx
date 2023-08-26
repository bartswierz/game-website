"use client";
import React, { useState, useEffect } from "react";
import { getPlatforms } from "@/utils";
import { GamePlatforms } from "@/types";
import GameLinkBasic from "@/components/ui/GameLinkBasic";
import LoadMorePlatforms from "@/components/ui/Loading/LoadMorePlatforms";
import Loading from "./loading";
import { ComboboxOrdering } from "@/components/ui";

//{ params }: { params: { genres: string; page_size: number } }
const Platforms = async () => {
  const [content, setContent] = useState<GamePlatforms | null>(null);

  // Ran once on page load
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlatforms();
      setContent(data);
    };

    fetchData();
  }, []);

  if (!content) return <Loading />;

  return (
    <div className="text-white">
      {/* HEADER TEXT */}
      <h1 className="mb-8">
        <span className="text-4xl font-semibold">Platforms</span>{" "}
        <span className="text-gray-500 text-base">{content.count} Platforms</span>
      </h1>

      {/* COMBOBOX - MAY BE REMOVED*/}
      <div className="ml-4 sm:ml-0 mb-6 flex justify-center xsm:justify-start">
        <ComboboxOrdering path={`/browse/platforms`} page="browse-platform" />
      </div>

      {/* <div className="flex flex-wrap gap-4"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {content.results.map(({ id, name, games_count, games }) => (
          <div key={name}>
            {/* <span className="font-bold text-3xl text-green-500">ID: {id}</span> */}
            <GameLinkBasic id={id} name={name} games_count={games_count} games={games} page="platforms" />
          </div>
        ))}
      </div>

      <LoadMorePlatforms />
    </div>
  );
};

export default Platforms;
