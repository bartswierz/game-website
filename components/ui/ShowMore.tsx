"use client";
import { Key, useState } from "react";

interface ShowMoreProps {
  text: string;
}

const ShowMore = ({ text }: ShowMoreProps) => {
  const [showText, setShowText] = useState(false);

  //REMOVES TAGS AND OTHER UNWANTED TEXT FROM DESCRIPTION
  const formatText = (description: string): string[] => {
    // Removes <p> & </p>
    const removeParagraphTags: string = description.replace(/<\/?p>/g, "");

    const replaceHex: string = removeParagraphTags.replace(/&#39;/g, "'");

    const splitAtBreakTags: string[] = replaceHex.split("<br />");
    return splitAtBreakTags;
  };

  // List because some descriptions fetched from API may have multiple paragraphs
  const formattedTextList: string[] = formatText(text);

  return (
    <div>
      {showText
        ? formattedTextList.map((paragraph, idx: Key) => <p key={idx}>{paragraph}</p>)
        : `${formattedTextList[0].slice(0, 350)}...`}
      <button className="bg-gray-200 text-gray-700 text-xxs rounded p-1 hover:bg-gray-300" onClick={() => setShowText(!showText)}>
        {showText ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ShowMore;
