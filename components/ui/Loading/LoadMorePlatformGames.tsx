"use client";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchNextPagePlatformGames } from "@/utils";
import Image from "next/image";
import { GamesByPlatform, GamesByPlatformResults } from "@/types";
import { Spinner } from "@/components/ui";
import Link from "next/link";
import { MdBrokenImage } from "react-icons/md";

interface LoadMoreProps {
  searchQuery: string;
}
// Button that will render another page of results to the screen when clicked once the user reaches the bottom of the page
const LoadMorePlatform = ({ searchQuery }: LoadMoreProps) => {
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);
  const [content, setContent] = useState<GamesByPlatformResults[]>([]);

  //Tracks window intersection to determine when to load more results(when user reaches the bottom of the page, load more)
  const { ref, inView, entry } = useInView();

  // IF USER REACHES THE END OF THE PAGE - LOAD MORE RESULTS
  useEffect(() => {
    if (inView) {
      loadMorePages();
    }
  }, [inView]);

  //Each page contains 10-12 games, depending on our page_size parameter passed in the call which can be adjusted. Current page size is 12
  const loadMorePages = async () => {
    const nextPage = pagesLoaded + 1;

    try {
      const fetchedContent: GamesByPlatform = await fetchNextPagePlatformGames(nextPage, searchQuery);
      const { results } = fetchedContent;

      // Add the new results to the existing content towards the bottom of the page
      setContent([...content, ...results]);

      // Updates the pages loaded state by 1
      setPagesLoaded((nextPage) => nextPage + 1);
    } catch (error) {
      console.log("loadMorePages ERROR: ", error);
    }
  };

  if (!content) return <Spinner />;

  return (
    <>
      <div className="mt-4">
        <div>
          {content && (
            <div className="grid grid-cols-1 px-4 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center">
              {content.map(({ slug, background_image, name, stores }) => (
                // <div key={slug} className="flex flex-col max-w-[500px] rounded-xl overflow-hidden bg-gray-800 h-max">
                <div
                  key={slug}
                  className="flex flex-col max-w-[500px] rounded-xl overflow-hidden  drop-shadow-md h-max shadow-2xl bg-gray-800 hover:ring-4 hover:ring-primary transition duration-300 ease-in-out"
                >
                  {/* GAME IMAGE */}
                  <div className="h-48">
                    {background_image ? (
                      <Image
                        src={background_image}
                        width={200}
                        height={200}
                        alt="Game Cover Display"
                        className="w-full h-full object-cover"
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
                    <h2 className="text-xl pb-2 font-bold mb-1 truncate">{name}</h2>

                    {/* NAVIGATES USER TO GAMES PAGE -> i.e.) http://localhost:3000/games/marvels-spider-man */}
                    <Link
                      href={`/games/${slug}`}
                      className="flex justify-center items-center font-semibold rounded-full text-lg hover:bg-gray-400 bg-gray-300 text-gray-700 px-2 py-1  max-w-1/2"
                    >
                      See Game Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Using 'ref' to trigger our useEffect for another API Call once the spinner is in view */}
        <div ref={ref} className="flex justify-center w-full mt-[3vh]">
          <Spinner />
        </div>
      </div>
    </>
  );
};

export default LoadMorePlatform;
