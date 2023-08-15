"use client";
import { Key, useState } from "react";
import { formatDescription } from "@/utils";

interface ShowMoreProps {
  text: string;
}

const ShowMore = ({ text }: ShowMoreProps) => {
  const [showText, setShowText] = useState(false);

  //REMOVES TAGS AND OTHER UNWANTED TEXT FROM DESCRIPTION
  // List because some descriptions fetched from API may have multiple paragraphs
  //TODO - check to ensure it is a string and not an array
  const formattedTextList: string[] = formatDescription(text);
  console.log("formattedTextList", formattedTextList);
  console.log("formattedTextList", typeof formattedTextList);

  //TODO - some games dont have a long first paragraph, need to extend it to 350 characters if it is less than that
  return (
    <div>
      {showText
        ? //DISPLAYS ALL PARAGRAPHS
          formattedTextList.map((paragraph, idx: Key) => (
            <>
              <p key={idx}>{paragraph}</p>
              {/* If not the last text in the list, add break tag */}
              {idx !== formattedTextList.length - 1 && <br />}
            </>
          ))
        : //DISPLAYS UP TO 350 Characters
          `${formattedTextList[0].slice(0, 350)}...`}
      <button className="bg-gray-200 text-gray-700 text-xxs rounded p-1 hover:bg-gray-300" onClick={() => setShowText(!showText)}>
        {showText ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ShowMore;
