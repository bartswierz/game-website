"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByPlatform } from "@/utils";
import { useState, useEffect } from "react";
import { GamesByPlatform } from "@/types";
import Image from "next/image";
import { LoadMorePlatformGames } from "@/components/ui";
import Link from "next/link";
import Loading from "./loading";
import { getPageTitle } from "@/utils/utils";
import { ComboboxOrdering } from "@/components/ui";
import { MdBrokenImage } from "react-icons/md";
import { PageHeader } from "@/components/ui";

const PlatformPage = () => {
  // if (1 === 1) return <Loading />;
  const searchParams = useSearchParams();
  const [content, setContent] = useState<GamesByPlatform | null>(null);

  const searchParamsID = searchParams.get("id"); //id=4
  const searchOrdering = searchParams.get("ordering"); //ordering=name -> 'name'
  const [searchID, setSearchID] = useState<string | null>(searchParamsID);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);
  const [pageTitle, setPageTitle] = useState<string | null>(null);

  useEffect(() => {
    setSearchID(searchParamsID);
  }, [searchParamsID]);

  useEffect(() => {
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  useEffect(() => {
    const fetchData = async (searchParamsID: string, ordering?: string) => {
      const data: GamesByPlatform = await getGamesByPlatform(searchParamsID, ordering);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesByPlatform");
    };

    if (searchID) {
      if (ordering) fetchData(searchID, ordering);
      else fetchData(searchID);
    }
  }, [searchID, ordering]);

  // Fetch the page title here
  useEffect(() => {
    const getTitle = async (searchParamsID: string | null) => {
      if (searchParamsID) {
        const title: string = await getPageTitle(searchParamsID);
        setPageTitle(title);
      } else throw new Error("No searchParamsID");
    };

    if (searchParamsID) getTitle(searchParamsID);
  }, [searchParamsID]);

  if (!content) return <Loading />;

  return (
    <div className="text-white">
      <PageHeader title="Platform Games" count={content.count} countType="Games" />

      <div className="ml-4 sm:ml-0 mb-6 flex justify-center xsm:justify-start">
        <ComboboxOrdering path={`/platforms/${pageTitle}?id=${searchParamsID}`} page="platforms" />
      </div>

      {/* http://localhost:3000/platforms/pc%3Fid=4?ordering=name */}
      <div>
        <div className="grid grid-cols-1 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
          {content.results.map(({ slug, background_image, name, stores }) => (
            <div
              key={slug}
              className="flex flex-col max-w-[500px] rounded-xl  drop-shadow-md h-max shadow-2xl bg-gray-800 hover:ring-4 hover:ring-primary transition duration-300 ease-in-out"
            >
              {/* GAME IMAGE */}
              <div className="h-48">
                {background_image ? (
                  <Image
                    src={background_image}
                    width={200}
                    height={200}
                    alt="Game Cover Display"
                    className="w-full h-full object-cover rounded-t-md "
                  />
                ) : (
                  // IF NO IMAGE URL, DISPLAY BROKEN IMAGE ICON
                  <div className="flex justify-center items-center h-full">
                    <MdBrokenImage size={80} color="grey" />
                  </div>
                )}
              </div>

              {/* TEXT CONTAINER */}
              <div className="text-center p-4">
                <h2 className="text-xl mb-3 font-bold truncate">{name}</h2>

                {/* NAVIGATES USER TO GAMES PAGE -> i.e.) http://localhost:3000/games/marvels-spider-man */}
                <Link
                  href={`/games/${slug}`}
                  className="flex justify-center items-center font-semibold rounded-full hover:bg-gray-400  bg-gray-300 text-gray-700 px-2 py-1 max-w-1/2 text-base xsm:text-lg "
                >
                  <span className="truncate">See Game Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {content?.next searchID && <LoadMorePlatformGames searchQuery={searchID} />} */}
      {searchParamsID && <LoadMorePlatformGames searchQuery={searchParamsID} />}
    </div>
  );
};

export default PlatformPage;
