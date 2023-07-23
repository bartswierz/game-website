"use client";
import React, { useState, useEffect } from "react";
import { getNextPlatformPage, getPage, getPlatforms } from "@/utils";
import { GamePlatforms } from "@/types";
import Image from "next/image";
import { NavigationButton } from "@/components/ui";
import Link from "next/link";
import GameLinkBasic from "@/components/ui/GameLinkBasic";

// type Props = {};

//{ params }: { params: { genres: string; page_size: number } }
const Platforms = async () => {
  const [content, setContent] = useState<GamePlatforms | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // # of items per page
  const page_size = 9;

  // Ran once on page load
  useEffect(() => {
    const fetchData = async () => {
      // const page_size = 6;
      const data = await getPlatforms(page_size);
      setContent(data);
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
    console.log(`Fetching data for ${pageDirection} page...`);
    if (pageDirection === "prev") {
      if (content?.previous) {
        // console.log("content.prev: ", content.previous);
        const newContent = await getNextPlatformPage(request);
        setContent(newContent);
      }
    } else if (pageDirection === "next") {
      if (content?.next) {
        // console.log("content.next: ", content.next);
        const newContent = await getNextPlatformPage(request);
        setContent(newContent);
      }
    }
  };

  // const platformData: GamePlatforms = await getPlatforms();

  if (!content) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <div>count: {content.count}</div>
      <div>next: {content.next}</div>
      <div>previous: {content.previous}</div>

      {/* NAVIGATION BUTTONS */}
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
          Page {currentPage} of {Math.ceil(content.count / page_size)}
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

      <div className="flex flex-wrap gap-4">
        {content.results.map(({ id, name, games_count, games }) => (
          <GameLinkBasic id={id} name={name} games_count={games_count} games={games} />
        ))}
      </div>
    </div>
  );
};

export default Platforms;
