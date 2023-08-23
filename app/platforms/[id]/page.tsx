"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByPlatform } from "@/utils";
import { useState, useEffect } from "react";
import { GamesByPlatform } from "@/types";
import Image from "next/image";
import { LoadMorePlatformGames } from "@/components/ui";
import Link from "next/link";
import Loading from "./loading";
import { getPlatformStoreLink, getPlatformIcon, getPageTitle } from "@/utils/utils";
import { ComboboxOrdering } from "@/components/ui";

//TODO - ERROR APPEARS WHEN SELECTING A ORDERING FILTER, THEN WHEN IT TRIES TO RENDER, WE GET THE RUNTIME ERROR, "Cannot read properties of null (reading 'default')". This could be related to content being loaded and/or null OR we are trying to setState while we are trying to render at the same time
const PlatformPage = () => {
  // if (1 === 1) return <Loading />;
  const [content, setContent] = useState<GamesByPlatform | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchParams = useSearchParams();

  const searchParamsID = searchParams.get("id"); //id=4
  const searchOrdering = searchParams.get("ordering"); //ordering=name -> 'name'
  const [searchID, setSearchID] = useState<string | null>(searchParamsID);
  const [ordering, setOrdering] = useState<string | null>(searchOrdering);
  const [pageTitle, setPageTitle] = useState<string | null>(getPageTitle(searchParamsID));
  console.log("pageTitle: ", pageTitle);
  // useEffect(() => {
  //   getPageTitle(searchParamsID);
  // }, [])
  // console.log("searchParamsID", searchParamsID);
  // console.log("searchID: ", searchID);
  // console.log("searchOrdering: ", searchOrdering);
  // console.log("ordering: ", ordering);

  // useEffect(() => {
  //   console.log("UPDATE setSearchID: ", searchParamsID);
  //   setSearchID((prev) => (searchParamsID ? searchParamsID : prev));
  // }, [searchParamsID]);
  useEffect(() => {
    // const searchParamsID = searchParams.get("id"); //id=4
    console.log("useEffect searchParamsID: ", searchParamsID);
    setSearchID(searchParamsID);
  }, [searchParamsID]);
  // useEffect(() => {
  //   const searchParamsID = searchParams.get("id"); //id=4
  //   console.log("useEffect searchParamsID: ", searchParamsID);
  //   setSearchID(searchParamsID);
  // }, []);

  useEffect(() => {
    console.log("UPDATE ordering: ", searchOrdering);
    setOrdering(searchOrdering);
  }, [searchOrdering]);

  // useEffect(() => {
  //   console.log("UPDATE ordering: ", searchOrdering);
  //   setOrdering(searchOrdering);
  // }, [content]);

  useEffect(() => {
    console.log("inside useEffect: ", searchID, ordering);

    const fetchData = async (searchParamsID: string, ordering?: string) => {
      // const data: GamesByPlatform = await getGamesByPlatform(searchParamsID, ordering);
      const data: GamesByPlatform = await getGamesByPlatform(searchParamsID, ordering);

      if (data) {
        setContent(data);
      } else throw new Error("No data returned from getGamesByPlatform");
      // setContent(data);
    };

    if (searchID) {
      if (ordering) fetchData(searchID, ordering);
      else fetchData(searchID);
    }
    // if (searchParamsID) {
    //   if (searchParamsOrdering) fetchData(searchParamsID, searchParamsOrdering);
    //   else fetchData(searchParamsID);
    // }
    // }, [searchParamsID, searchParamsOrdering]);
    // }, [searchID, searchParamsOrdering]);
  }, [searchID, ordering]);

  // if (!content || !searchID) return <Loading />;
  if (!content) return <Loading />;

  return (
    <div className="text-white">
      {/* <div className="text-4xl font-semibold mb-6 flex flex-col xsm:flex-row items-end"> */}
      {content && (
        <>
          <div className="flex text-4xl font-semibold mb-6">
            <span>PLATFORM GAMES</span>
            <span className="text-base text-gray-500 ml-2 self-end">{content.count}+ Games</span>
          </div>
          {/* <ComboboxOrdering platforms={null} path={`/platforms/pc`} uid={searchParamsID} /> */}
          {/* <ComboboxOrdering platforms={null} path={`/platforms/pc?id=${searchParamsID}`} uid={searchParamsID} /> */}
          {/* <ComboboxOrdering platforms={null} path={`/platforms/pc?id=${searchParamsID}`} /> */}
          {/* TODO - replace pc with console name */}
          {/* <ComboboxOrdering path={`/platforms/pc?id=${searchParamsID}`} /> */}
          <ComboboxOrdering path={`/platforms/${pageTitle}?id=${searchParamsID}`} />
          {/* <ComboboxOrdering path={`/platforms/?id=${searchParamsID}`} /> */}
          {/* http://localhost:3000/platforms/pc%3Fid=4?ordering=name */}
          <div>
            {/* BELOW ARE FOR DEVELOPING PURPOSES */}
            {/* <p>Next: {content.next}</p> */}
            {/* <p>Previous: {content.previous}</p> */}

            <div className="grid grid-cols-1 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
              {/* {content.results.map(({ slug, background_image, name, stores }) => ( */}
              {content &&
                content.results.map(({ slug, background_image, name, stores }) => (
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
                              // Fetches the store link
                              href={getPlatformStoreLink(store.slug)}
                              target="_blank"
                              className="flex gap-x-2 items-center justify-center py-2 border border-blue-500 hover:bg-gray-700 rounded-full hover:ring-2"
                              key={store.id}
                            >
                              {/* Fetches the store icon */}
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
            {/* {searchParamsID && <LoadMorePlatformGames searchQuery={searchParamsID} />} */}
          </div>
        </>
      )}

      {/* {content?.next searchID && <LoadMorePlatformGames searchQuery={searchID} />} */}
      {/* {content?.next && searchID && <LoadMorePlatformGames searchQuery={searchID} />} */}
      {/* {searchID && <LoadMorePlatformGames searchQuery={searchID} />} */}
      {searchParamsID && <LoadMorePlatformGames searchQuery={searchParamsID} />}
    </div>
  );
};

export default PlatformPage;
