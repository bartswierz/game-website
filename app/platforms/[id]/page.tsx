"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByPlatform } from "@/utils";
import { useState, useEffect } from "react";
import { GamesByPlatform } from "@/types";
import Image from "next/image";

const PlatformPage = () => {
  const [content, setContent] = useState<GamesByPlatform | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const searchParamsID = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGamesByPlatform(searchParamsID, 6);
      setContent(data);
    };

    if (searchParamsID) fetchData();
  }, []);

  // console.log("searchParams in platform page: ", searchParamsID);

  if (!content) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <p>SEARCH PARAMS ID: {searchParamsID}</p>
      <div>
        <p>Games Count: {content.count}</p>
        <p>Next: {content.next}</p>
        <p>Previous: {content.previous}</p>
        <p>
          {content.results.map((game) => (
            <div className="border">
              <p>Name: {game.name}</p>
              <p>Slug: {game.slug}</p>
              <p className="flex flex-row">
                <h2>Platforms: </h2>
                {game.platforms.map((platform) => (
                  <div className="border border-red-500">
                    <p>{platform.platform.id}</p>
                    <p>{platform.platform.name}</p>
                    <p>{platform.platform.slug}</p>
                  </div>
                ))}
              </p>
              <div className="flex flex-row">
                <h2>Stores: </h2>
                {game.stores.map((store) => (
                  <div className="border border-blue-500">
                    <div>{store.store.id}</div>
                    <div>{store.store.name}</div>
                    <div>{store.store.slug}</div>
                  </div>
                ))}
              </div>

              <Image src={game.background_image} width={200} height={200} alt="Game Cover Display" />
            </div>
          ))}
        </p>
        {/* <div>{content.results.}</div> */}
      </div>
    </div>
  );
};

export default PlatformPage;
