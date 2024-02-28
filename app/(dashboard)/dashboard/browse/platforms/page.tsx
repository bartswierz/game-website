// "use client";
import React, { useState, useEffect } from "react";
import { getPlatforms } from "@/utils";
import { GamePlatforms } from "@/types";
import GameLinkBasic from "@/components/ui/GameLinkBasic";
import LoadMorePlatforms from "@/components/ui/Loading/LoadMorePlatforms";
import Loading from "./loading";
import { PageHeader } from "@/components/ui";

//{ params }: { params: { genres: string; page_size: number } }
const Platforms = async () => {
  const [content, setContent] = useState<GamePlatforms | null>(null);
  console.log("inside /dashboard/browse/platforms");
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
      <PageHeader title="Platforms" count={content.count} countType="Platforms" hidePlus />

      {/* <div className="flex flex-wrap gap-4"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {content.results.map(({ id, name, games_count, games }) => (
          <div key={name}>
            <GameLinkBasic id={id} name={name} games_count={games_count} games={games} page="platforms" />
          </div>
        ))}
      </div>

      <LoadMorePlatforms />
    </div>
  );
};

export default Platforms;
