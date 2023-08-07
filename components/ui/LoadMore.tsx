"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchNextPage } from "@/utils";
import Image from "next/image";
import { GamesByPlatform } from "@/types";
import { Spinner } from "@/components/ui";
import Link from "next/link";
import { getPlatformIcon, getPlatformStoreLink } from "@/app/platforms/[id]/page";
import { delay } from "@reduxjs/toolkit/dist/utils";

interface LoadMoreProps {
  nextCall: string | null;
}
// Button that will render another page of results to the screen when clicked once the user reaches the bottom of the page
const LoadMore = ({ nextCall }: LoadMoreProps) => {
  // TODO - passing api call doesn't work, we need to create a api call that updates the page number
  const [pagesLoaded, setPagesLoaded] = useState(1);
  console.log("nextCall passed: ", nextCall);
  // const [content, setContent] = useState<GamesByPlatform["results"] | [{}]>([{}]);
  const [content, setContent] = useState<[]>([]);
  //Tracks window intersection to determine when to load more results(when user reaches the bottom of the page, load more)
  const { ref, inView, entry } = useInView();

  //TODO - FIX THIS - useEffect isnt triggering when inView changes
  useEffect(() => {
    console.log("inview useEffect");
    // IF USER REACHES THE END OF THE PAGE - LOAD MORE RESULTS
    if (inView) {
      // setPagesLoaded((pagesLoaded) => pagesLoaded + 1);
      // WHEN USER SCROLLS TO THE END - MAKE THE CALL TO THE API TO GET THE NEXT PAGE OF RESULTS
      console.log("scrolled to the end");
      loadMorePages();
    }
  }, [inView]);

  //Each page contains 10-12 games, depending on our page_size parameter passed in the call which can be adjusted. Current page size is 12
  const loadMorePages = async () => {
    // delay(2000);
    const nextPage = pagesLoaded + 1;
    console.log("inside loadMorePages");

    const newContent: GamesByPlatform = (await fetchNextPage(nextPage)) ?? {};
    const { results } = newContent;

    setContent([...content, ...results]);

    // Updates the pages loaded state by 1
    setPagesLoaded((nextPage) => nextPage + 1);
  };

  if (!content) return <Spinner />;

  return (
    <>
      {/* // <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3 border border-red-500" ref={ref}> */}
      <div>
        <div>
          {content && (
            <div className="flex flex-row flex-wrap gap-4 justify-center bg-green-500">
              {content.map((game) => (
                <div key={game.slug} className="flex flex-col max-w-[500px] rounded-xl overflow-hidden bg-gray-800 w-72 h-max">
                  {/* GAME IMAGE */}
                  <div className="w-72 h-48  ">
                    <Image
                      src={game.background_image}
                      width={200}
                      height={200}
                      alt="Game Cover Display"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* TEXT CONTAINER */}
                  <div className="text-center p-4">
                    <h2 className="text-xl pb-2 font-bold">{game.name}</h2>

                    <div className="flex flex-col gap-y-4 p-2">
                      {/* AVAILABLE STORES */}
                      {game.stores ? (
                        game.stores.map(({ store }) => (
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
                        href={`/games/${game.slug}`}
                        className="flex justify-center items-center font-semibold rounded-full text-lg hover:bg-gray-400 border  bg-gray-300 text-gray-700 px-2 py-1  max-w-1/2"
                      >
                        See Game Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Once Spinner is reached we will trigger our useEffect to do another API CALL */}
        <div ref={ref} className="w-full bg-red-500">
          <Spinner />
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     {/* ref ensures whenever the load component is in view we would call the useEffect*/}
  //     {content && (
  //       // <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3 border border-red-500" ref={ref}>
  //       <div className="border border-red-500" ref={ref}>
  //         {/* {content.results.map((game) => { */}
  //         {content.map((game) => {
  //           return (
  //             <div key={game.slug}>
  //               <div>More Games</div>
  //               <h1>{game.name}</h1>
  //               <Image src={game.background_image} width={300} height={300} alt="Game Display" />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     )}
  //   </>
  // );
};

export default LoadMore;
