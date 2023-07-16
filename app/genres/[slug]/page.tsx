"use client";
import { useSearchParams } from "next/navigation";
import { getGamesByGenre, getNextGameDevelopersPage, getNextGameGenrePage, getPage } from "@/utils";
import { GamesByGenre } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationButton } from "@/components/ui";

// TODO - GRAB THE SLUG PASSED AND USE IT TO GET THE GENRE GAMES LIST - EX. browse/genres/[action] -> slug = action
// const GenrePage = async ({ params }: { params: { slug: string } }) => {
//ex. http://localhost:3000/genres/shooter?genres=action&page_size=6
//ex. http://localhost:3000/genres/shooter?genres=4&page_size=6
const GenrePage = async () => {
  // console.log("APP/GENRES/[SLUG]/PAGE.TSX - params: ", params);
  // Grabs the ID from the URL
  const searchParams = useSearchParams();
  const searchGenreID = searchParams.get("genres"); // genres=action
  const searchPageSize = searchParams.get("page_size"); // page_size=6
  console.log("searchGenre = ", searchGenreID);
  console.log("searchPageSize = ", searchPageSize);
  const [content, setContent] = useState<GamesByGenre>();
  const [currentPage, setCurrentPage] = useState<string>("1");
  // Fetch Genre Info using the passed ID from browse/genres Page
  useEffect(() => {
    //ex searchID for action games is 'action' | 4
    const fetchGamesByGenreInfo = async (searchID: string | number, searchPageSize: string | null) => {
      const data: GamesByGenre = await getGamesByGenre(searchID, searchPageSize);

      if (data) {
        // console.log("GAMES BY GENRE - data: ", data);
        setContent(data);
      } else throw new Error("No data returned from getGenreInfo");
    };

    if (searchGenreID && searchPageSize) fetchGamesByGenreInfo(searchGenreID, searchPageSize);
  }, [searchGenreID]);

  // Updates current page number whenever we get a new set of data from API
  useEffect(() => {
    // If content.next exists, get the page number from it
    if (content?.next) {
      // const pageNumber = getPage(content.next);
      const pageNumber = content.next.split("page=");
      const strippedPageNumber = pageNumber[1][0];
      console.log("pageNumber: ", pageNumber);
      console.log("strippedPageNumber: ", strippedPageNumber);
      setCurrentPage(strippedPageNumber);
    }
  }, [content]);

  // Handle page change
  //TODO - NAVIGATION IS BROKEN ONCE IT HITS PAGE 10 BECAUSE WE ARE STRIPPING AWAY THE VALUE, we need to find a way to pull it more dynamically
  const handlePageChange = async (request: string | null, pageDirection: string) => {
    console.log(`Fetching data for ${pageDirection} page...`);
    console.log("PAGE CHANGE - request: ", request);
    if (pageDirection === "prev") {
      if (content?.previous) {
        // console.log("content.prev: ", content.previous);
        const newContent = await getNextGameGenrePage(request);
        setContent(newContent);
      }
    } else if (pageDirection === "next") {
      if (content?.next) {
        // console.log("content.next: ", content.next);
        const newContent = await getNextGameGenrePage(request);
        setContent(newContent);
      }
    }
  };

  // While loading data from API
  if (!content) return <div className="text-white text-3xl">Loading...</div>;

  return (
    <div className="border text-white">
      <div>APP - GENRES PAGE - INFO PASSED BELOW</div>
      <div>GAME DEVELOPERS INFORMATION</div>
      <ul>
        <li># of Developers: {content.count}</li>
        <li># of Pages: {Math.ceil(content.count / 10)}</li>
        <li>next: {content.next}</li>
        <li>previous: {content.previous}</li>
        <li># of Games Fetched: {content.results.length}</li>
      </ul>

      <div className="my-5">
        {/* PREVIOUS BUTTON */}
        {content.previous ? (
          <NavigationButton
            text="Prev"
            request={content.previous}
            onPageChange={handlePageChange}
            pageDirection={"prev"}
            active={`${content.previous === null ? "inactive" : "active"}`}
          />
        ) : (
          <NavigationButton
            text="Prev"
            request={null}
            onPageChange={handlePageChange}
            pageDirection={"prev"}
            active={`${content.previous === null ? "inactive" : "active"}`}
          />
        )}

        {/* Page Counter */}
        <div className="inline-block px-4 py-2 m-1">
          Page {currentPage} of {Math.ceil(content.count / 10)}
        </div>

        {/* NEXT BUTTON */}
        <NavigationButton
          text="Next"
          request={content.next}
          onPageChange={handlePageChange}
          pageDirection={"next"}
          active={`${content.next === null ? "inactive" : "active"}`}
        />
      </div>

      <div className="">
        {content && (
          <div className="w-[50]">
            <ul className="flex flex-row flex-wrap gap-4">
              {content.results.map((game) => (
                <li className="border cursor-pointer">
                  <Link href={`/games/${game.slug}`} key={game.slug} className="">
                    <h2>{game.name}</h2>
                    <div>
                      <Image src={game.background_image} width={300} height={300} alt="Game" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
