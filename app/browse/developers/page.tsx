"use client";
import { getGameDevelopers, getNextGameDevelopersPage, getPage } from "@/utils";
import React, { useState, useEffect } from "react";
import { NavigationButton } from "@/components/ui";
import { GameDevelopers, GameDevelopersResults } from "@/types";
import GameLinkBasic from "@/components/ui/GameLinkBasic";

const Developers = () => {
  // const router = useRouter();
  const [content, setContent] = useState<GameDevelopers | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Ran once on page load
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching data from API...");
      const developers = await getGameDevelopers();
      setContent(developers);
    };

    fetchData();
  }, []);

  // Updates current page number whenever we get a new set of data from API
  useEffect(() => {
    // If content.next exists, get the page number from it
    if (content?.next) {
      const pageNumber = getPage(content.next);
      setCurrentPage(pageNumber);
    }
  }, [content]);

  // Handle page change
  const handlePageChange = async (request: string | null, pageDirection: string) => {
    // console.log(`Fetching data for ${pageDirection} page...`);
    if (pageDirection === "prev") {
      if (content?.previous) {
        // console.log("content.prev: ", content.previous);
        const newContent = await getNextGameDevelopersPage(request);
        setContent(newContent);
      }
    } else if (pageDirection === "next") {
      if (content?.next) {
        // console.log("content.next: ", content.next);
        const newContent = await getNextGameDevelopersPage(request);
        setContent(newContent);
      }
    }
  };

  // While loading data from API
  if (!content) return <div className="text-white text-3xl">Loading...</div>;

  // Once data is ready to display
  return (
    <div className="text-white">
      <div className="text-4xl font-bold">
        DEVELOPERS <span className="text-sm text-gray-500">{content.count} Developers</span>
      </div>

      {/* <div># of Pages: {Math.ceil(content.count / 6)}</div> */}
      {/* <div className="truncate">next: {content.next}</div> */}
      {/* <div>previous: {content.previous}</div> */}

      <div className="my-5">
        {/* PREVIOUS BUTTON - IF NULL - FADED*/}
        {content.previous ? (
          <NavigationButton
            text="Prev"
            request={content.previous}
            onPageChange={handlePageChange}
            pageDirection={"prev"}
            active={`${content.previous === null ? "inactive" : "active"}`}
          />
        ) : (
          // NULL - NO PREVIOUS PAGE AVAILABLE
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
          Page {currentPage} of {Math.ceil(content.count / 6)}
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

      <div className="grid xl:grid-cols-2 gap-10">
        {/* slice will return 3 DEVELOPERS instead of 6 DEVELOPERS */}
        {content.results.map(({ id, name, games_count, games }: GameDevelopersResults) => {
          // games.slice(0, 3) will return 3 GAMES instead of 6 GAMES
          // TODO - FIX THIS - CENTER THE GAMES - ADD A SEE MORE BUTTON IN THE FOURTH POSITION, WHICH WILL DISP
          return (
            <div key={id}>
              <GameLinkBasic id={id} name={name} games_count={games_count} games={games} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Developers;
