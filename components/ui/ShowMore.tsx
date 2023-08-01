"use client";
import { useState } from "react";

interface ShowMoreProps {
  text: string;
}
//TODO pass in text
const ShowMore = ({ text }: ShowMoreProps) => {
  const [showText, setShowText] = useState(false);

  console.log("text: ", text);

  //REMOVES TAGS AND OTHER UNWANTED TEXT FROM DESCRIPTION
  const formatText = (description: string): string[] => {
    // Removes <p> & </p>
    const removeParagraphTags = description.replace(/<\/?p>/g, "");

    const replaceHex = removeParagraphTags.replace(/&#39;/g, "'");

    const splitAtBreakTags = replaceHex.split("<br />");
    return splitAtBreakTags;
  };

  //TODO - REMOVE TAGS HERE THEN PASS TO RETURN
  console.log("before: ", text);
  const formattedText: string[] = formatText(text);
  console.log("after: ", formattedText);

  //DESTRUCTURE
  // return <p>{description} TEST</p>;
  // return <p>{description} TEST</p>;
  return <p>Text</p>;
};

export default ShowMore;
