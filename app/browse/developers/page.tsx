"use client";
import { getGameDevelopers } from "@/utils";
import React, { useState, useEffect } from "react";
import { GameDevelopers, GameDevelopersResults } from "@/types";
import GameLinkBasic from "@/components/ui/GameLinkBasic";
import LoadMoreDevelopers from "@/components/ui/Loading/LoadMoreDevelopers";
import Loading from "./loading";

const Developers = () => {
  const [content, setContent] = useState<GameDevelopers | null>(null);

  // Ran once on page load
  useEffect(() => {
    const fetchData = async () => {
      const developers = await getGameDevelopers();
      setContent(developers);
    };

    fetchData();
  }, []);

  // While loading data from API
  if (!content) return <Loading />;

  // Once data is ready to display
  return (
    <div className="text-white">
      <div className="text-4xl font-bold mb-8">
        DEVELOPERS <span className="text-sm text-gray-500">{content.count} Developers</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {content.results.map(({ id, name, games_count, games }: GameDevelopersResults) => {
          return (
            <div key={id}>
              <GameLinkBasic id={id} name={name} games_count={games_count} games={games} page="developer" />
            </div>
          );
        })}
      </div>

      <LoadMoreDevelopers />
    </div>
  );
};

export default Developers;
