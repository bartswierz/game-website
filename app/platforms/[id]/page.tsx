"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByPlatform } from "@/utils";
import { useState, useEffect } from "react";
import { GamesByPlatform } from "@/types";
import Image from "next/image";
import { FaSteam, FaPlaystation, FaXbox, FaApple, FaGooglePlay } from "react-icons/fa";
import { SiNintendo, SiGogdotcom, SiItchdotio, SiEpicgames, SiNintendoswitch } from "react-icons/si";
import { PiDesktopTowerDuotone } from "react-icons/pi";
import { BsAndroid2 } from "react-icons/bs";

import Link from "next/link";
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

  const getPlatformStoreLink = (storeSlug: string) => {
    switch (storeSlug.toLowerCase()) {
      case "steam":
        return "https://store.steampowered.com/";
      case "xbox-store":
        return "https://www.microsoft.com/";
      case "xbox360":
        return "https://marketplace.xbox.com/";
      case "xbox-one":
        return "https://www.microsoft.com/";
      case "xbox-series-x":
        return "https://www.microsoft.com/";
      case "playstation-store":
        return "https://store.playstation.com/";
      case "playstation5":
        return "https://store.playstation.com/";
      case "playstation4":
        return "https://store.playstation.com/";
      case "playstation3":
        return "https://store.playstation.com/";
      case "apple-appstore":
        return "https://www.apple.com/";
      case "gog":
        return "https://www.gog.com/";
      case "nintendo":
        return "https://www.nintendo.com/";
      case "nintendo-switch":
        return "https://www.nintendo.com/";
      case "google-play":
        return "https://play.google.com/";
      case "itch.io":
        return "https://itch.io/";
      case "epic-games":
        return "https://store.epicgames.com/";
      default:
        return "N/A";
    }
  };
  // Pass in a slug and return the appropriate icon
  const getPlatformIcon = (storeSlug: string) => {
    // console.log("companyDescription passed:", companyDescription);
    const size = 20;
    switch (storeSlug.toLowerCase()) {
      case "steam":
        return <FaSteam size={size} />;
      case "xbox-store":
        return <FaXbox size={size} />;
      case "xbox360":
        return <FaXbox size={size} />;
      case "xbox-one":
        return <FaXbox size={size} />;
      case "xbox-series-x":
        return <FaXbox size={size} />;
      case "playstation-store":
        return <FaPlaystation size={size} />;
      case "playstation5":
        return <FaPlaystation size={size} />;
      case "playstation4":
        return <FaPlaystation size={size} />;
      case "playstation3":
        return <FaPlaystation size={size} />;
      case "apple-appstore":
        return <FaApple size={size} />;
      case "android":
        return <BsAndroid2 size={size} />;
      case "gog":
        return <SiGogdotcom size={size} />;
      case "nintendo":
        return <SiNintendo size={size} />;
      case "nintendo-switch":
        return <SiNintendoswitch size={size} />;
      case "google-play":
        return <FaGooglePlay size={size} />;
      case "itch.io":
        return <SiItchdotio size={size} />;
      case "epic-games":
        return <SiEpicgames size={size} />;
      case "pc":
        return <PiDesktopTowerDuotone size={size} />;
      case "macos":
        return <PiDesktopTowerDuotone size={size} />;
      case "linux":
        return <PiDesktopTowerDuotone size={size} />;
      default:
        return "N/A";
    }
  };

  if (!content) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <p>SEARCH PARAMS ID: {searchParamsID}</p>
      <div>
        <p>Games Count: {content.count}</p>
        <p>Next: {content.next}</p>
        <p>Previous: {content.previous}</p>

        <div className="flex flex-col gap-y-4">
          {content.results.map((game) => (
            <div className="border flex flex-row">
              {/* GAME IMAGE */}
              <div className="w-64 h-64">
                <Image
                  src={game.background_image}
                  width={200}
                  height={200}
                  alt="Game Cover Display"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT CONTAINER */}
              <div className="w-full p-4">
                <h2 className="text-xl pb-2">{game.name}</h2>
                {/* <p>Slug: {game.slug}</p> */}
                {/* <p className="flex flex-row"> */}

                <div className="flex flex-col content-between justify-between h-3/4 ">
                  {/* AVAILABLE PLATFORMS */}
                  <div className="flex flex-row flex-wrap gap-x-2">
                    <h2>Available for: </h2>
                    {game.platforms.map((platform) => (
                      <div className="flex flex-col items-center justify-center">
                        {/* <div className="flex flex-col items-center justify-center p-2 border border-blue-500 rounded-lg min-w-[100px]"> */}
                        {/* <p>{platform.platform.id}</p> */}
                        {/* <div>{getPlatformIcon(platform.platform.slug)}</div> */} <span> {platform.platform.name}</span>
                        {/* <p>{platform.platform.slug}</p> */}
                      </div>
                    ))}
                  </div>

                  {/* AVAILABLE STORES */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-x-2 items-center">
                      <h2>Stores: </h2>
                      {game.stores ? (
                        game.stores.map((store) => (
                          <Link
                            href={getPlatformStoreLink(store.store.slug)}
                            target="_blank"
                            className="flex flex-col items-center p-3 border border-blue-500 hover:bg-gray-700 rounded-full ring-1"
                          >
                            {getPlatformIcon(store.store.slug)}
                            {/* <span>{store.store.name}</span> */}
                          </Link>
                        ))
                      ) : (
                        <p>Currently Unavailable...</p>
                      )}
                    </div>

                    {/* NAVIGATES USER TO GAMES PAGE -> i.e.) http://localhost:3000/games/marvels-spider-man */}
                    <Link href={`/games/${game.slug}`} className="underline text-lg hover:text-blue-500">
                      See Game Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
