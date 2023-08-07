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
import { LoadMorePlatform } from "@/components/ui";
import Link from "next/link";

export const getPlatformStoreLink = (storeSlug: string) => {
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
export const getPlatformIcon = (storeSlug: string) => {
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

const PlatformPage = () => {
  const [content, setContent] = useState<GamesByPlatform>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();
  const searchParamsID = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const data: GamesByPlatform = await getGamesByPlatform(searchParamsID);
      setContent(data);
    };

    if (searchParamsID) fetchData();
  }, []);

  // console.log("searchParams in platform page: ", searchParamsID);

  const testComponent = () => {
    return <div>Test</div>;
  };

  if (!content) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      {/* <div className="text-4xl font-semibold mb-6 flex flex-col xsm:flex-row items-end"> */}
      <div className="flex text-4xl font-semibold mb-6">
        <span>PLATFORM GAMES</span>
        <span className="text-base text-gray-500 ml-2 self-end">{content.count}+ Games</span>
      </div>
      <div>
        {/* BELOW ARE FOR DEVELOPING PURPOSES */}
        {/* <p>Next: {content.next}</p> */}
        {/* <p>Previous: {content.previous}</p> */}

        {/* <div className="flex flex-row flex-wrap gap-4 justify-center"> */}
        <div className="grid grid-cols-1 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
          {content.results.map(({ slug, background_image, name, stores }) => (
            <div key={slug} className="flex flex-col max-w-[500px] rounded-xl overflow-hidden bg-gray-800 h-max">
              {/* GAME IMAGE */}
              <div className="h-48">
                <Image
                  src={background_image}
                  width={200}
                  height={200}
                  alt="Game Cover Display"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT CONTAINER */}
              <div className="text-center p-4">
                <h2 className="text-xl pb-2 font-bold">{name}</h2>

                <div className="flex flex-col gap-y-4 p-2">
                  {/* AVAILABLE STORES */}
                  {stores ? (
                    stores.map(({ store }) => (
                      <Link
                        href={getPlatformStoreLink(store.slug)}
                        target="_blank"
                        className="flex gap-x-2 items-center justify-center py-2 border border-blue-500 hover:bg-gray-700 rounded-full hover:ring-2"
                        key={store.id}
                      >
                        {getPlatformIcon(store.slug)}
                        <span>{store.name}</span>
                      </Link>
                    ))
                  ) : (
                    <p>Currently Unavailable...</p>
                  )}

                  {/* NAVIGATES USER TO GAMES PAGE -> i.e.) http://localhost:3000/games/marvels-spider-man */}
                  <Link
                    href={`/games/${slug}`}
                    className="flex justify-center items-center font-semibold rounded-full text-lg hover:bg-gray-400 border  bg-gray-300 text-gray-700 px-2 py-1  max-w-1/2"
                  >
                    See Game Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOADING ICON AT THE BOTTOM */}
        {searchParamsID && <LoadMorePlatform searchQuery={searchParamsID} />}
      </div>
    </div>
  );
};

export default PlatformPage;
